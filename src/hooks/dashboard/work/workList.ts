import { useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceCategory } from "@/utils/APIs/types";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { addWorkStudio, getWorkStudio } from "@/utils/APIs/dashboard";
import { notifySuccess } from "@/utils/showToast";
import { createContext } from "react";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

export function useWorkList(workCategory: keyof typeof workspaceCategory) {
  const queryClient = useQueryClient();

  const {
    data: workList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [dashboardQueryKeys.workStudio(), workCategory],
    queryFn: getWorkStudio(workCategory),
  });

  const onClickAddWork = useOnClickUpdate({
    mutationFn: addWorkStudio,
    queryKey: [dashboardQueryKeys.workStudio(), workCategory],
    savingMessage: "작품 추가 중",
    errorMessage: "작품 추가에 실패했습니다.",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifySuccess("작품이 추가되었습니다.");
    },
  })();

  return {
    workList,
    error,
    isLoading,
    onClickAddWork,
  };
}

export const WorkListContext = createContext(
  {} as ReturnType<typeof useWorkList>
);
