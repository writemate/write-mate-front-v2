import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceCategory } from "@/utils/APIs/types";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { addWorkStudio, getWorkStudio } from "@/utils/APIs/dashboard";
import { notifySuccess } from "@/utils/showToast";
import { createContext } from "react";

export function useWorkList({ workCategory }: { workCategory: keyof typeof workspaceCategory }) {
  const queryClient = useQueryClient();

  const {
    data: workList,
    error,
    isLoading,
  } = useQuery({
    queryKey: [dashboardQueryKeys.workStudio(), workCategory],
    queryFn: getWorkStudio(workCategory),
  });

  const { mutate: onAddWorkClick } = useMutation({
    mutationFn: addWorkStudio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifySuccess("작품이 추가되었습니다.");
    },
  });

  return {
    workList,
    error,
    isLoading,
    onAddWorkClick,
  };
}

export const WorkListContext = createContext({} as ReturnType<typeof useWorkList>);
