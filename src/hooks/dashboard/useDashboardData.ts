import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { getWorkStudio } from "@/utils/APIs/dashboard";

export default function useDashboardData() {
  const { data: workStudio, error, isLoading } = useQuery({
    queryKey: dashboardQueryKeys.workStudio(),
    queryFn: getWorkStudio,
  });

  return {
    workStudio,
    error,
    isLoading,
  };
}
