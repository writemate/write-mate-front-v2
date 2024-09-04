'use client';
import { useEffect, useState } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getPlotFolderList } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFile, TFolder, TFolderWithOptions } from '@/utils/APIs/types';

const recursiveFolderAddOptions = (folder: TFolder): TFolderWithOptions => {
  return {
    ...folder,
    isOpen: false,
    isSelect: false,
    files: folder.files.map((file) => {
      if (file.isFolder) {
        return recursiveFolderAddOptions(file);
      }
      return file;
    }),
  };
};

const recursiveFolderUnselect = (folder: TFolderWithOptions) => {
  folder.isSelect = false;
  folder.files.forEach((file) => {
    if (file.isFolder) {
      recursiveFolderUnselect(file);
    }
  });
};

export default function usePlotSidebar() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const [rootFolder, setRootFolder] = useState<Array<TFile|TFolderWithOptions>|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
    queryFn: getPlotFolderList(workspace_id),
  });

  useEffect(() => {
    if (data) {
      setRootFolder(recursiveFolderAddOptions(data).files);
    }
  }, [data]);

  const toggleFolder = (folder: TFolderWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder([...rootFolder]);
  };

  const openFolder = (folder: TFolderWithOptions) => () => {
    if(rootFolder === null) return;
    rootFolder.filter((file) => file.isFolder).forEach(recursiveFolderUnselect);
    folder.isOpen = true;
    folder.isSelect = true;
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
