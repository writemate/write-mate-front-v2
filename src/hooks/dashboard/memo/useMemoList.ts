import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { getMemoList, createMemo } from "@/utils/APIs/memo";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { notifySuccess } from "@/utils/showToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useMemoList() {
  const queryClient = useQueryClient();
  const {
    data: memoList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [dashboardQueryKeys.memo()],
    queryFn: getMemoList,
  });

  const onClickAddMemo = useOnClickUpdate({
    mutationFn: createMemo,
    queryKey: [dashboardQueryKeys.memo()],
    savingMessage: "메모 추가 중",
    errorMessage: "메모 추가에 실패했습니다.",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.memo()],
      });
      notifySuccess("메모가 추가되었습니다.");
    },
  })();

  return {
    memoList,
    error,
    isLoading,
    onClickAddMemo,
  };
}
