'use client';
import { useState, useEffect } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPlotFolderList, updatePlotFolder } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { recursiveFolderAddOptions, recursiveUnselect, currentFileSelect, getSelectedFolder, recursiveFileUnpin, recursiveFindParent } from '@/utils/controlFolders';

export default function usePlotSidebar() {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string, plot_id?: string }>();
  const [rootFolder, setRootFolder] = useState<TFolderWithOptions|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
    queryFn: getPlotFolderList(workspace_id),
  });
  const [draggingItem, setDraggingItem] = useState<TFileWithOptions|TFolderWithOptions|null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePlotFolder
  });

  useEffect(() => {
    if (data) {
      const rootFolder = recursiveFolderAddOptions(data);
      rootFolder.isSelect = true;
      if (plot_id) currentFileSelect(rootFolder, plot_id);
      setRootFolder(rootFolder);
    }
  }, [data]);

  useEffect(() => {
    if (rootFolder) {
      if (plot_id) currentFileSelect(rootFolder, plot_id);
      else recursiveUnselect(rootFolder);
      setRootFolder({...rootFolder});
    }
  }, [plot_id]);

  const toggleFolder = (folder: TFolderWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder({...rootFolder});
  };

  const openFolder = (folder: TFolderWithOptions) => () => {
    if(rootFolder === null) return;
    //폴더를 열면 나머지 폴더와 파일들의 선택을 해제하고 해당 폴더를 선택한다.
    recursiveUnselect(rootFolder);
    folder.isOpen = true;
    folder.isSelect = true;
    setRootFolder({...rootFolder});
  };

  const clearSelect = (e: React.MouseEvent) => {
    if(e.target !== e.currentTarget) return;
    if(rootFolder === null) return;
    //사이드바에서 빈 곳을 클릭하면 모든 선택을 해제한다.(현재 접속 중인 파일이 있을 경우 해당 파일을 선택한다).
    if(plot_id) currentFileSelect(rootFolder, plot_id);
    else recursiveUnselect(rootFolder);
    rootFolder.isSelect = true;
    setRootFolder({...rootFolder});
  }

  const createFolder = () => {
    if(rootFolder === null) return;
    const selectedFolder = getSelectedFolder(rootFolder);
    if (!selectedFolder) return;
    //폴더를 생성하면 나머지 폴더와 파일들의 선택을 해제하고 새로 생성한 폴더를 선택한다.
    recursiveUnselect(rootFolder);
    selectedFolder.files.push({
      isFolder: true,
      isOpen: true,
      isSelect: true,
      isEditing: true,
      folder_name: "새 폴더",
      files: [],
    });
    setRootFolder({...rootFolder});
    //이름 변경 완료 시 서버에 폴더 구조 반영 => 여기에서 mutate를 호출할 필요가 없다.
  };

  const createFile = () => {
    if(rootFolder === null) return;
    const selectedFolder = getSelectedFolder(rootFolder);
    if (!selectedFolder) return;
    //파일을 생성하면 나머지 폴더와 파일들의 선택을 해제하고 새로 생성한 파일을 선택한다.
    recursiveUnselect(rootFolder);
    selectedFolder.files.push({
      _id: "",
      isFolder: false,
      file_name: "새 파일",
      isSelect: true,
      isEditing: true,
      isPinned: false,
    });
    setRootFolder({...rootFolder});
    //일단 폴더랑 똑같이 처리중이긴한데, 파일의 경우 서버에 파일 생성 요청을 보내야 하므로 추후 수정이 필요하다.
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
    else {
      folderOrfile.file_name = folderOrfile.file_name.trim();
      //파일 이름 변경 완료 시 해당 파일의 선택을 해제한다(현재 접속 중인 파일이 있을 경우 해당 파일을 선택한다).
      //만약 이름 변경 시 해당 파일로 이동해야 한다면 이 부분을 수정해야 한다.
      if(plot_id) currentFileSelect(rootFolder, plot_id);
      recursiveUnselect(rootFolder);
    }
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
    recursiveUnselect(rootFolder);
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
    //서버에 폴더 구조 반영
    mutate({ workId: workspace_id, folder: rootFolder });
    //TODO: 서버에 파일 삭제 반영
  }

  const setMainPlot = (file: TFileWithOptions) => () => {
    if(rootFolder === null) return;
    recursiveFileUnpin(rootFolder);
    file.isPinned = true;
    setRootFolder({...rootFolder});
    mutate({ workId: workspace_id, folder: rootFolder });
  }

  const changeOrderAfterItem = (file: TFileWithOptions) => {
    console.log('changeOrderBeforeItem', rootFolder, draggingItem, file);
    if(rootFolder === null) return;
    if(draggingItem === null) return;

    //remove draggingItem from rootFolder
    const parent = recursiveFindParent(rootFolder, draggingItem);
    if(parent === null) return;
    
    //add draggingItem before file
    const targetParent = recursiveFindParent(rootFolder, file);
    if(targetParent === null) return;

    //remove draggingItem from rootFolder
    const index = parent.files.indexOf(draggingItem);
    parent.files.splice(index, 1);
    //add draggingItem before file
    const targetIndex = targetParent.files.indexOf(file);
    targetParent.files.splice(targetIndex+1, 0, draggingItem);
    setRootFolder({...rootFolder});
    mutate({ workId: workspace_id, folder: rootFolder });
  }

  const changeOrderLastOfFolder = (folder: TFolderWithOptions) => {
    if(rootFolder === null) return;
    if(draggingItem === null) return;

    //remove draggingItem from rootFolder
    const parent = recursiveFindParent(rootFolder, draggingItem);
    if(parent === null) return;
    //add draggingItem last of folder
    const targetParent = folder;

    //remove draggingItem from rootFolder
    const index = parent.files.indexOf(draggingItem);
    parent.files.splice(index, 1);
    //add draggingItem last of folder
    targetParent.files.push(draggingItem);
    targetParent.isOpen = true;
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
    draggingItem,
    setDraggingItem,
    changeOrderAfterItem,
    changeOrderLastOfFolder,
  };
}
