'use client';
import { useEffect, useState } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getPlotFolderList } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFile, TFolder } from '@/utils/APIs/types';

type TFolderWithOpenOption = TFolder & { isOpen: boolean };

export default function usePlotSidebar() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const [rootFolder, setRootFolder] = useState<Array<TFile|TFolder>|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
    queryFn: getPlotFolderList(workspace_id),
  });

  useEffect(() => {
    if (data) {
      setRootFolder(data.files);
    }
  }, [data]);

  const handleToggleFolder = (folder: TFolderWithOpenOption) => {
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder([...rootFolder]);
  };

  return {
    workspace_id,
    rootFolder,
    isLoading,
    error,
    handleToggleFolder,
  };  
}
