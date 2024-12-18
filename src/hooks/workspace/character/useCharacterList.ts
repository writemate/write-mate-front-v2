'use client';
import { useState, useRef, RefObject } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getKeywordList, getCharacterList, createCharacter, createKeyword, setMainCharacter, unsetMainCharacter } from '@/utils/APIs/workspace/character';
import { useParams } from 'next/navigation';

//키워드 입력창(position:absolute)이 부모요소를 넘어가지 않도록 위치를 조정
const getLeftPositionOfMiniModal = (keywordListRef: RefObject<HTMLDivElement>, addButtonRef: RefObject<HTMLDivElement>) => {
  if (!keywordListRef.current || !addButtonRef.current) return 0;
  const keywordListRect = keywordListRef.current.getBoundingClientRect();
  const addButtonRect = addButtonRef.current.getBoundingClientRect();
  if(addButtonRect.left+320+10<keywordListRect.right) return 10;
  return keywordListRect.right - addButtonRect.left - 320;
}

export const useCharacterList = () => {
  const keywordListRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data: keywordList, isLoading: isKeywordsLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    queryFn: getKeywordList(workspace_id),
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
    mutationFn: createKeyword(workspace_id),
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
          if (character.id === characterId) {
            return { ...character, isMain: true };
          }
          return character;
        });
      });
    }
  });

  const { mutate: removeMainCharacterMutation } = useMutation({
    mutationFn: unsetMainCharacter(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterList(workspace_id) });
    },
    onMutate: async (characterId: string) => {
      queryClient.setQueryData(workspaceQueryKeys.characterList(workspace_id), (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
        return oldData.map((character) => {
          if (character.id === characterId) {
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
    return selectedKeywords.some((keywordId) => character.keyword.some(({id}) => id === keywordId));
  });

  const realCharacterList = selectedKeywords.length === 0 ? characterList : selectedCharacter;

  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const [miniKeywordInput, setMiniKeywordInput] = useState('');

  const openMiniModal = () => {
    setMiniModalOpen(true);
  }

  const onBlurredMiniModal = () => {
    setMiniModalOpen(false);
    setMiniKeywordInput('');
  }

  const onChangeMiniKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiniKeywordInput(e.target.value);
  }

  const addKeywordWithRandomColor = () => {
    if(miniKeywordInput === '') return;
    addKeyword({ word: miniKeywordInput});
    setMiniKeywordInput('');
    setMiniModalOpen(false);
  }

  const onEnterPressAtMiniModal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addKeywordWithRandomColor();
    }
  }

  const onClickAddKeywordAtMiniModal = () => {
    addKeywordWithRandomColor();
  }

  const miniModalLeftPosition = getLeftPositionOfMiniModal(keywordListRef, addButtonRef);

  return {
    workspace_id,
    keywordList,
    characterList: realCharacterList,
    isKeywordsLoading,
    isCharactersLoading,
    addCharacter,
    isAddingCharacter,
    isAddingKeyword,
    selectKeyword,
    isSelectedKeyword,
    removeSelectedKeyword,
    setMainCharacter: (characterId: string) => () => setMainCharacterMutation(characterId),
    removeMainCharacter: (characterId: string) => () => removeMainCharacterMutation(characterId),
    miniModalOpen,
    openMiniModal,
    miniKeywordInput,
    onBlurredMiniModal,
    onChangeMiniKeywordInput,
    onEnterPressAtMiniModal,
    onClickAddKeywordAtMiniModal,
    keywordListRef,
    addButtonRef,
    miniModalLeftPosition
  };
};
