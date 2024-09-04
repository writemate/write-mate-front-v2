'use client';
import { useEffect, useState } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getPlotFolderList } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFile, TFolder, TFolderWithOpenOption } from '@/utils/APIs/types';

const recursiveFolderAddOpenOption = (folder: TFolder): TFolderWithOpenOption => {
  return {
    ...folder,
    isOpen: false,
    files: folder.files.map((file) => {
      if (file.isFolder) {
        return recursiveFolderAddOpenOption(file);
      }
      return file;
    }),
  };
};

export default function usePlotSidebar() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const [rootFolder, setRootFolder] = useState<Array<TFile|TFolderWithOpenOption>|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
    queryFn: getPlotFolderList(workspace_id),
  });

  useEffect(() => {
    if (data) {
      setRootFolder(recursiveFolderAddOpenOption(data).files);
    }
  }, [data]);

  const toggleFolder = (folder: TFolderWithOpenOption) => () => {
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder([...rootFolder]);
  };

  const openFolder = (folder: TFolderWithOpenOption) => () => {
    if(rootFolder === null) return;
    folder.isOpen = true;
    setRootFolder([...rootFolder]);
  };

  return {
    workspace_id,
    rootFolder,
    isLoading,
    error,
    openFolder,
    toggleFolder,
  };  
}
