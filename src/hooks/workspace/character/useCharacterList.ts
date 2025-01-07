"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getKeywordList,
  getCharacterList,
  createCharacter,
  createKeyword,
  setMainCharacter,
  unsetMainCharacter,
  deleteKeyword,
} from "@/utils/APIs/workspace/character";
import { useParams } from "next/navigation";
import useMiniModal from "./useMiniModal";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

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

  const onClickAddCharacter = useOnClickUpdate({
    mutationFn: createCharacter(workspace_id),
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    savingMessage: "인물 추가 중",
    errorMessage: "인물 추가에 실패했습니다.",
    onMutate: async () => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterList(workspace_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
          return [
            ...oldData,
            {
              id: null,
              ch_name: "",
              description: "",
              keyword: [],
              isMain: false,
            },
          ];
        }
      );
      return { prevData };
    },
    onError: (error, newCharacter, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        context?.prevData
      );
    },
  })();

  const onClickAddKeyword = useOnClickUpdate({
    mutationFn: createKeyword(workspace_id),
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    savingMessage: "키워드 추가 중",
    errorMessage: "키워드 추가에 실패했습니다.",
    onMutate: async ({ word, color }) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterKeywordList(workspace_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterKeywordList(workspace_id),
        (oldData: Awaited<ReturnType<ReturnType<typeof getKeywordList>>>) => {
          return [
            ...oldData,
            { id: null, word: word, light_color: "", dark_color: "" },
          ];
        }
      );
      return { prevData };
    },
    onError: (error, newKeyword, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterKeywordList(workspace_id),
        context?.prevData
      );
    },
  });

  const onClickSetMainCharacter = useOnClickUpdate({
    mutationFn: setMainCharacter(workspace_id),
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    savingMessage: "메인 캐릭터 설정 중",
    errorMessage: "메인 캐릭터 설정에 실패했습니다.",
    onMutate: async (characterId: string) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterList(workspace_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
          return oldData.map((character) => {
            if (character.id === characterId) {
              return { ...character, isMain: true };
            }
            return character;
          });
        }
      );
      return { prevData };
    },
    onError: (error, newCharacter, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        context?.prevData
      );
    },
    clickEvent: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
  });

  const onClickUnsetMainCharacter = useOnClickUpdate({
    mutationFn: unsetMainCharacter(workspace_id),
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    savingMessage: "메인 캐릭터 해제 중",
    errorMessage: "메인 캐릭터 해제에 실패했습니다.",
    onMutate: async (characterId: string) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterList(workspace_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        (oldData: Awaited<ReturnType<ReturnType<typeof getCharacterList>>>) => {
          return oldData.map((character) => {
            if (character.id === characterId) {
              return { ...character, isMain: false };
            }
            return character;
          });
        }
      );
      return { prevData };
    },
    onError: (error, newCharacter, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        context?.prevData
      );
    },
    clickEvent: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
  });

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const selectKeyword = (keywordId: string) => () => {
    setSelectedKeywords((prev) => [...prev, keywordId]);
  };

  const isSelectedKeyword = (keywordId: string) => {
    return selectedKeywords.includes(keywordId);
  };

  const removeSelectedKeyword = (keywordId: string) => {
    setSelectedKeywords((prev) => prev.filter((id) => id !== keywordId));
  };

  //선택된 키워드가 하나라도 있는 character만 불러오기
  const selectedCharacter = characterList?.filter((character) => {
    return selectedKeywords.some((keywordId) =>
      character.keyword.some(({ id }) => id === keywordId)
    );
  });

  const realCharacterList =
    selectedKeywords.length === 0 ? characterList : selectedCharacter;

  const {
    keywordListRef,
    addButtonRef,
    miniModalOpen,
    openMiniModal,
    miniKeywordInput,
    onBlurredMiniModal,
    onChangeMiniKeywordInput,
    miniModalLeftPosition,
  } = useMiniModal();

  const addKeywordWithRandomColor = () => {
    if (miniKeywordInput === "") return;
    onClickAddKeyword({ word: miniKeywordInput })();
    onBlurredMiniModal();
  };

  const onEnterPressAtMiniModal = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      addKeywordWithRandomColor();
    }
  };

  const onClickAddKeywordAtMiniModal = () => {
    addKeywordWithRandomColor();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const selectColor = (color: string) => () => setSelectedColor(color);
  const selectRandom = () => setSelectedColor(null);
  const [modalInput, setModalInput] = useState("");
  const onChangeModalInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setModalInput(e.target.value);
  const onClickCreateKeyword = () => {
    onClickAddKeyword({
      word: modalInput,
      color: selectedColor ?? undefined,
    })();
  };

  const onClickDeleteKeyword = useOnClickUpdate({
    mutationFn: deleteKeyword(workspace_id),
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    savingMessage: "키워드 삭제 중",
    errorMessage: "키워드 삭제에 실패했습니다.",
  });

  return {
    workspace_id,
    keywordList,
    characterList: realCharacterList,
    isKeywordsLoading,
    isCharactersLoading,
    onClickAddCharacter,
    onClickAddKeyword,
    selectKeyword,
    isSelectedKeyword,
    removeSelectedKeyword,
    onClickSetMainCharacter,
    onClickUnsetMainCharacter,
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
    onClickDeleteKeyword,
  };
};
