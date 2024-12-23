'use client';
import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getKeywordList, getCharacterList, createCharacter, createKeyword, setMainCharacter, unsetMainCharacter, deleteKeyword } from '@/utils/APIs/workspace/character';
import { useParams } from 'next/navigation';
import useMiniModal from './useMiniModal';
import { useOnClickUpdate } from '@/hooks/common/useOnClickUpdate';

export const useCharacterList = () => {
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

  const { keywordListRef, addButtonRef, miniModalOpen, openMiniModal, miniKeywordInput, onBlurredMiniModal, onChangeMiniKeywordInput, miniModalLeftPosition } = useMiniModal();

  const addKeywordWithRandomColor = () => {
    if(miniKeywordInput === '') return;
    addKeyword({ word: miniKeywordInput});
    onBlurredMiniModal();
  }

  const onEnterPressAtMiniModal = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addKeywordWithRandomColor();
    }
  }

  const onClickAddKeywordAtMiniModal = () => {
    addKeywordWithRandomColor();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const selectColor = (color: string) => () => setSelectedColor(color);
  const selectRandom = () => setSelectedColor(null);
  const [modalInput, setModalInput] = useState('');
  const onChangeModalInput = (e: React.ChangeEvent<HTMLInputElement>) => setModalInput(e.target.value);
  const onClickCreateKeyword = () => {
    addKeyword({ word: modalInput, color: selectedColor??undefined });
  }

  const onClickDeleteKeyword = useOnClickUpdate({
    mutationFn: deleteKeyword(workspace_id),
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    savingMessage: '키워드 삭제 중',
    errorMessage: '키워드 삭제에 실패했습니다.',
  });

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
    miniModalLeftPosition,
    isModalOpen,
    openModal,
    closeModal,
    selectedColor,
    selectColor,
    selectRandom,
    modalInput,
    setModalInput,
    onChangeModalInput,
    onClickCreateKeyword,
    onClickDeleteKeyword
  };
};
