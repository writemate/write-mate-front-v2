import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getWork } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useWorkspaceHeader() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.workName(workspace_id),
    queryFn: getWork(workspace_id),
  });

  const [isOpenVersionControl, setIsOpenVersionControl] = useState(false);
  const onClickVersionControl = () => {
    setIsOpenVersionControl((prev) => !prev);
  };
  const closeVersionControl = () => {
    setIsOpenVersionControl(false);
  };
  return {
    data,
    error,
    isLoading,
    isOpenVersionControl,
    onClickVersionControl,
    closeVersionControl,
  };
}
