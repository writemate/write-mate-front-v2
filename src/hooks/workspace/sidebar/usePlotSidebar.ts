'use client';
import { useState, useEffect } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlotFolderList, updatePlotFolder } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { recursiveFolderAddOptions, recursiveFolderUnselect, getSelectedFolder, recursiveFileUnpin, recursiveFindParent } from '@/utils/controlFolders';

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

  const applyChange = (folderOrfile: TFolderWithOptions|TFileWithOptions) => {
    if(rootFolder === null) return;
    folderOrfile.isEditing = false;
    if(folderOrfile.isFolder)
      folderOrfile.folder_name = folderOrfile.folder_name.trim();
    else
      folderOrfile.file_name = folderOrfile.file_name.trim();
    setRootFolder({...rootFolder});
    mutate({ workId: workspace_id, folder: rootFolder });
  }

  const onBlur = (folderOrfile: TFolderWithOptions|TFileWithOptions) => () => applyChange(folderOrfile);

  const onKeyDown = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      applyChange(folderOrfile);
    }
  }

  const changeName = (folderOrfile: TFolderWithOptions|TFileWithOptions) => () => {
    if(rootFolder === null) return;
    recursiveFolderUnselect(rootFolder);
    folderOrfile.isSelect = true;
    folderOrfile.isEditing = true;
    setRootFolder({...rootFolder});
  }

  const deleteFolderOrFile = (folderOrfile: TFolderWithOptions|TFileWithOptions) => () => {
    if(rootFolder === null) return;
    if(confirm(`정말 ${folderOrfile.isFolder? `폴더 "${folderOrfile.folder_name}"` : `파일 "${folderOrfile.file_name}"`}을 삭제하시겠습니까?`) === false) return;
    const parent = recursiveFindParent(rootFolder, folderOrfile);
    if(parent === null) return;
    const index = parent.files.indexOf(folderOrfile);
    parent.files.splice(index, 1);
    setRootFolder({...rootFolder});
    mutate({ workId: workspace_id, folder: rootFolder });
  }

  const setMainPlot = (file: TFileWithOptions) => () => {
    if(rootFolder === null) return;
    recursiveFileUnpin(rootFolder);
    file.isPinned = true;
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
    onBlur,
    onKeyDown,
    changeName,
    deleteFolderOrFile,
    setMainPlot,
  };  
}
