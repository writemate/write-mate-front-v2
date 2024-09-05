'use client';
import { useState, useEffect } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlotFolderList, updatePlotFolder } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { recursiveFolderAddOptions, recursiveFolderUnselect, getSelectedFolder } from '@/utils/controlFolders';

export default function usePlotSidebar() {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const [rootFolder, setRootFolder] = useState<TFolderWithOptions|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
    queryFn: getPlotFolderList(workspace_id),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updatePlotFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
      });
    }
  });

  useEffect(() => {
    if (data) {
      const rootFolder = recursiveFolderAddOptions(data);
      rootFolder.isSelect = true;
      setRootFolder(rootFolder);
    }
  }, [data]);

  const toggleFolder = (folder: TFolderWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder({...rootFolder});
  };

  const openFolder = (folder: TFolderWithOptions) => () => {
    if(rootFolder === null) return;
    recursiveFolderUnselect(rootFolder);
    folder.isOpen = true;
    folder.isSelect = true;
    setRootFolder({...rootFolder});
  };

  const clearSelect = (e: React.MouseEvent) => {
    if(e.target !== e.currentTarget) return;
    if(rootFolder === null) return;
    recursiveFolderUnselect(rootFolder);
    rootFolder.isSelect = true;
    setRootFolder({...rootFolder});
  }

  const createFolder = () => {
    if(rootFolder === null) return;
    const selectedFolder = getSelectedFolder(rootFolder);
    if (!selectedFolder) return;
    recursiveFolderUnselect(rootFolder);
    selectedFolder.files.push({
      isFolder: true,
      isOpen: true,
      isSelect: true,
      isEditing: true,
      folder_name: "새 폴더",
      files: [],
    }as TFolderWithOptions);
    setRootFolder({...rootFolder});
  };

  const createFile = () => {
    if(rootFolder === null) return;
    const selectedFolder = getSelectedFolder(rootFolder);
    if (!selectedFolder) return;
    recursiveFolderUnselect(rootFolder);
    selectedFolder.files.push({
      isFolder: false,
      file_name: "새 파일",
      isSelect: true,
      isEditing: true,
    }as TFileWithOptions);
    setRootFolder({...rootFolder});
  };

  const onChange = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if(rootFolder === null) return;
    if(folderOrfile.isFolder)
      folderOrfile.folder_name = e.target.value;
    else
      folderOrfile.file_name = e.target.value;
    setRootFolder({...rootFolder});
  }

  const onBlur = (folderOrfile: TFolderWithOptions|TFileWithOptions) => () => {
    if(rootFolder === null) return;
    if(folderOrfile.isFolder)
      folderOrfile.isEditing = false;
    else
      folderOrfile.isEditing = false;
    setRootFolder({...rootFolder});
    mutate({ workId: workspace_id, folder: rootFolder });
  }

  return {
    workspace_id,
    rootFolder,
    isLoading,
    isPending,
    error,
    openFolder,
    toggleFolder,
    clearSelect,
    createFolder,
    createFile,
    onChange,
    onBlur
  };  
}
