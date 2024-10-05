'use client';
import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getCharacterKeywordList, getCharacterList, createCharacter, createCharacterKeyword, setMainCharacter, removeMainCharacter } from '@/utils/APIs/workspace';
import { useParams } from 'next/navigation';

export const useCharacterList = () => {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data: keywordList, isLoading: isKeywordsLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    queryFn: getCharacterKeywordList(workspace_id),
  });

  const { data: characterList, isLoading: isCharactersLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    queryFn: getCharacterList(workspace_id),
  });

  const { mutate: addCharacter, isPending: isAddingCharacter } = useMutation({
    mutationFn: createCharacter(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterList(workspace_id) });
    },
  });

  const { mutate: addKeyword, isPending: isAddingKeyword } = useMutation({
    mutationFn: createCharacterKeyword(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterKeywordList(workspace_id) });
    },
  });

  const { mutate: setMainCharacterMutation } = useMutation({
    mutationFn: setMainCharacter(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterList(workspace_id) });
    },
    onMutate: async (characterId: string) => {
      queryClient.setQueryData(workspaceQueryKeys.characterList(workspace_id), (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
        return oldData.map((character) => {
          if (character._id === characterId) {
            return { ...character, isMain: true };
          }
          return character;
        });
      });
    }
  });

  const { mutate: removeMainCharacterMutation } = useMutation({
    mutationFn: removeMainCharacter(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterList(workspace_id) });
    },
    onMutate: async (characterId: string) => {
      queryClient.setQueryData(workspaceQueryKeys.characterList(workspace_id), (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
        return oldData.map((character) => {
          if (character._id === characterId) {
            return { ...character, isMain: false };
          }
          return character;
        });
      });
    }
  });

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const selectKeyword = (keywordId: string) => () => {
    setSelectedKeywords((prev) => [...prev, keywordId]);
  }

  const isSelectedKeyword = (keywordId: string) => {
    return selectedKeywords.includes(keywordId);
  }

  const removeSelectedKeyword = (keywordId: string) => {
    setSelectedKeywords((prev) => prev.filter((id) => id !== keywordId));
  }


  //선택된 키워드가 하나라도 있는 character만 불러오기
  const selectedCharacter = characterList?.filter((character) => {
    return selectedKeywords.some((keywordId) => character.keyword.includes(keywordId));
  });

  const realCharacterList = selectedKeywords.length === 0 ? characterList : selectedCharacter;

  return {
    keywordList,
    characterList: realCharacterList,
    isKeywordsLoading,
    isCharactersLoading,
    addCharacter,
    addKeyword,
    isAddingCharacter,
    isAddingKeyword,
    selectKeyword,
    isSelectedKeyword,
    removeSelectedKeyword,
    setMainCharacter: (characterId: string) => () => setMainCharacterMutation(characterId),
    removeMainCharacter: (characterId: string) => () => removeMainCharacterMutation(characterId),
  };
};
