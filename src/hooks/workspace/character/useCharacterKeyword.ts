import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMiniModal from "./useMiniModal";
import {
  createKeyword,
  getKeywordList,
} from "@/utils/APIs/workspace/character";
import {
  addKeywordToCharacter,
  removeKeywordFromCharacter,
} from "@/utils/APIs/workspace/character";
import { useCharacter } from "./character";
import { TKeyword } from "@/utils/APIs/types";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useParams } from "next/navigation";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

export function useCharacterKeyword() {
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

  const { workspace_id, character_id } = useParams<{
    workspace_id: string;
    character_id: string;
  }>();
  const queryClient = useQueryClient();

  const { data: keywordList, isLoading: isKeywordsLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    queryFn: getKeywordList(workspace_id),
  });

  const { mutateAsync: mutateCreateKeywordAsync, isPending: creatingKeyword } =
    useMutation({
      mutationFn: createKeyword(workspace_id),
      onMutate: () => {
        queryClient.cancelQueries({
          queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
        });
      },
      onSuccess: () => {
        queryClient.setQueryData(
          workspaceQueryKeys.characterKeywordList(workspace_id),
          (prev: any) => {
            return [
              ...prev,
              {
                id: "",
                word: miniKeywordInput,
                light_color: "",
                dark_color: "",
              },
            ];
          }
        );
        queryClient.invalidateQueries({
          queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
        });
      },
    });

  const onClickAddKeywordToCharacter = useOnClickUpdate({
    mutationFn: addKeywordToCharacter(workspace_id, character_id),
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    savingMessage: "캐릭터에 키워드 추가 중",
    errorMessage: "캐릭터 키워드 추가에 실패했습니다.",
    onMutate: (keyword_id: string) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id)
      );
      const keywordData = queryClient.getQueryData<TKeyword[]>(
        workspaceQueryKeys.characterKeywordList(workspace_id)
      );
      if (!prevData || !keywordData) return;
      const keyword = keywordData.find((k) => k.id === keyword_id);
      if (!keyword) return;
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        (prev: any) => {
          return {
            ...prev,
            keyword: [...prev.keyword, keyword],
          };
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        context?.prevData
      );
    },
  });

  const onClickCreateAndAddKeywordToCharacter = async () => {
    if (miniKeywordInput === "") return;
    const keyword = await mutateCreateKeywordAsync({ word: miniKeywordInput });
    if (keyword) {
      onClickAddKeywordToCharacter(keyword)();
    }
    onBlurredMiniModal();
  };

  const onEnterPressAtMiniModal = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      console.log("onEnterPressAtMiniModal");
      onClickCreateAndAddKeywordToCharacter();
    }
  };

  const onClickRemoveKeywordFromCharacter = useOnClickUpdate({
    mutationFn: removeKeywordFromCharacter(workspace_id, character_id),
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    savingMessage: "캐릭터에서 키워드 삭제 중",
    errorMessage: "캐릭터 키워드 삭제에 실패했습니다.",
    onMutate: (keyword_id: string) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id)
      );
      if (!prevData) return;
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        (prev: any) => {
          return {
            ...prev,
            keyword: prev.keyword.filter((k: any) => k.id !== keyword_id),
          };
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        context?.prevData
      );
    },
  });

  return {
    keywordList,
    isKeywordsLoading,
    keywordListRef,
    addButtonRef,
    miniModalOpen,
    openMiniModal,
    miniKeywordInput,
    onBlurredMiniModal,
    onChangeMiniKeywordInput,
    miniModalLeftPosition,
    onClickAddKeywordToCharacter,
    onClickRemoveKeywordFromCharacter,
    onClickCreateAndAddKeywordToCharacter,
    onEnterPressAtMiniModal,
    creatingKeyword,
  };
}
