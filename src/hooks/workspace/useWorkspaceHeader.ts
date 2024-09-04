import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getWork } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";

export default function useWorkspaceHeader() {
  const {workspace_id} = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.work(workspace_id),
    queryFn: getWork(workspace_id),
  });


  return {
    data,
    error,
    isLoading,
  };
}
