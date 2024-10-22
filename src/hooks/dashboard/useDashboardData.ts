import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { getWorkStudio, addWorkStudio } from "@/utils/APIs/dashboard";

export default function useDashboardData() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: dashboardQueryKeys.workStudio(),
    queryFn: getWorkStudio(),
  });

  const { mutate, isPending: isAdding } = useMutation({
    mutationFn: addWorkStudio,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.workStudio(),
      });
    }
  });


  return {
    data,
    mutate,
    isAdding,
    error,
    isLoading,
  };
}
