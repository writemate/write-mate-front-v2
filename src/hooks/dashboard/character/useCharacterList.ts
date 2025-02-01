import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { createMCharacter, getMCharacterList } from "@/utils/APIs/memo";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { TMCharacter } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useCharacterList() {
  const queryClient = useQueryClient();
  const {
    data: characterList,
    isLoading,
    error,
  } = useQuery({
    queryKey: dashboardQueryKeys.characterList(),
    queryFn: getMCharacterList,
  });

  const onClickAddCharacter = useOnClickUpdate({
    mutationFn: createMCharacter,
    queryKey: dashboardQueryKeys.characterList(),
    savingMessage: "캐릭터 추가 중",
    errorMessage: "캐릭터 추가에 실패했습니다.",
    onSuccess: () => {
      notifySuccess("캐릭터가 추가되었습니다.");
    },
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.characterList()
      ) as TMCharacter[];
      queryClient.setQueryData(dashboardQueryKeys.characterList(), [
        ...prevData,
        {
          id: null,
          ch_name: "",
          ch_image: "",
          description: "",
          role: "",
          gender: "",
          birthday: "",
          characteristic: [],
          updatedAt: new Date().toISOString(),
        },
      ]);
      return { prevData };
    },
    onError: (error, newCharacter, context) => {
      queryClient.setQueryData(
        dashboardQueryKeys.characterList(),
        context?.prevData
      );
    },
  })();

  return {
    characterList,
    isLoading,
    error,
    onClickAddCharacter,
  };
}
