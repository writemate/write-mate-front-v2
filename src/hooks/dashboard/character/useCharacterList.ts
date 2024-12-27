import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { createMCharacter, getMCharacterList } from "@/utils/APIs/memo";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { notifySuccess } from "@/utils/showToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCharacterList() {
  const queryClient = useQueryClient();
  const {
    data: characterList,
    isLoading,
    error,
  } = useQuery({
    queryKey: [dashboardQueryKeys.character()],
    queryFn: getMCharacterList,
  });

  const onClickAddCharacter = useOnClickUpdate({
    mutationFn: createMCharacter,
    queryKey: [dashboardQueryKeys.character()],
    savingMessage: "캐릭터 추가 중",
    errorMessage: "캐릭터 추가에 실패했습니다.",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.character()],
      });
      notifySuccess("캐릭터가 추가되었습니다.");
    },
  })();

  return {
    characterList,
    isLoading,
    error,
    onClickAddCharacter,
  };
}
