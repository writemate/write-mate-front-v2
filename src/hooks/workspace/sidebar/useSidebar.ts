'use client';
import { useState, useEffect } from 'react';
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlot, getPlotFolderList, updatePlotFolder, createScript, getScriptFolderList, updateScriptFolder, updatePlotName, updateScriptName, setMainPlot, deletePlot, setMainScript, deleteScript } from "@/utils/APIs/workspace";
import { useParams } from "next/navigation";
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { recursiveFolderAddOptions, recursiveUnselect, isExistEditing, getSelectedFolder, recursiveFileUnpin, recursiveFindParent, isExistSelect } from '@/utils/controlFolders';

const getAPIFunctionsAndQueryKey = (type: "plot" | "script") => {
  if(type === "plot") return {
    getFolderList: getPlotFolderList,
    create: createPlot,
    updateFolder: updatePlotFolder,
    updateName: updatePlotName,
    setMain: setMainPlot,
    deleteItem: deletePlot,
    queryKey: workspaceQueryKeys.plotSidebar,
  };
  return {
    getFolderList: getScriptFolderList,
    create: createScript,
    updateFolder: updateScriptFolder,
    updateName: updateScriptName,
    setMain: setMainScript,
    deleteItem: deleteScript,
    queryKey: workspaceQueryKeys.scriptSidebar,
  };
}

export default function usePlotSidebar(type: "plot" | "script") {
  const { getFolderList, updateFolder, create, queryKey, updateName, setMain, deleteItem } = getAPIFunctionsAndQueryKey(type);
  const { workspace_id } = useParams<{ workspace_id: string, plot_id?: string }>();
  const [rootFolder, setRootFolder] = useState<TFolderWithOptions|null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: queryKey(workspace_id),
    queryFn: getFolderList(workspace_id),
  });
  const [draggingItem, setDraggingItem] = useState<TFileWithOptions|TFolderWithOptions|null>(null);

  const { mutate: mutateFolder, mutateAsync: mutateFolderAsync } = useMutation({ mutationFn: updateFolder(workspace_id) });
  const { mutateAsync: addItem, isPending } = useMutation({mutationFn: create(workspace_id)});
  const { mutate: mutateName } = useMutation({mutationFn: updateName});
  const { mutate: mutateSetMain } = useMutation({mutationFn: setMain});
  const { mutate: mutateDelete } = useMutation({mutationFn: deleteItem});

  const isSelectedFolderExist =
    rootFolder !== null
    && (isExistSelect(rootFolder)
    ||isExistEditing(rootFolder));

  useEffect(() => {
    if (data) {
      const rootFolder = recursiveFolderAddOptions(data);
      setRootFolder(rootFolder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const toggleFolder = (folder: TFolderWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (rootFolder === null) return;
    folder.isOpen = !folder.isOpen;
    setRootFolder({...rootFolder});
  };

  //폴더를 열면 나머지 폴더와 파일들의 선택을 해제하고 해당 폴더를 선택한다.
  const openFolder = (folder: TFolderWithOptions) => () => {
    if(rootFolder === null) return;
    //폴더를 열면 나머지 폴더와 파일들의 선택을 해제하고 해당 폴더를 선택한다.
    recursiveUnselect(rootFolder);
    folder.isOpen = true;
    folder.isSelect = true;
    setRootFolder({...rootFolder});
  };

  //드래그 앤 드롭을 위한 폴더 열기 함수(선택은 하지 않음)
  const openFolderForDrag = (folder: TFolderWithOptions) => {
    if(rootFolder === null) return;
    folder.isOpen = true;
    setRootFolder({...rootFolder});
  };

  const clearSelect = (e: React.MouseEvent) => {
    if(e.target !== e.currentTarget) return;
    if(rootFolder === null) return;
    //사이드바에서 빈 곳을 클릭하면 모든 선택을 해제한다.(현재 접속 중인 파일이 있을 경우 해당 파일을 선택한다).
    recursiveUnselect(rootFolder);
    setRootFolder({...rootFolder});
  }

  const createFolder = () => {
    if(rootFolder === null) return;
    let selectedFolder = getSelectedFolder(rootFolder);
    if (selectedFolder === null) 
      selectedFolder = rootFolder;
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

  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const createFile = async () => {
    if(rootFolder === null) return;
    if(isCreatingFile) return;
    setIsCreatingFile(true);
    let selectedFolder = getSelectedFolder(rootFolder);
    if (selectedFolder === null) 
      selectedFolder = rootFolder;
    const newFile: TFileWithOptions = {
      id: await addItem(),
      isFolder: false,
      file_name: "새 파일",
      isEditing: true,
      isPinned: false,
    };
    selectedFolder.files.push(newFile);
    await mutateFolderAsync(rootFolder);
    setRootFolder({...rootFolder});
    setIsCreatingFile(false);
  };

  const applyChangeName = (folderOrfile: TFolderWithOptions|TFileWithOptions, name: string) => {
    if(rootFolder === null) return;
    folderOrfile.isEditing = false;
    if(folderOrfile.isFolder)
      folderOrfile.folder_name = name.trim();
    else {
      folderOrfile.file_name = name.trim();
      //만약 이름 변경 시 해당 파일로 이동해야 한다면 이 부분을 수정해야 한다.
      mutateName({id: folderOrfile.id, name});
    }
    setRootFolder({...rootFolder});
    mutateFolder(rootFolder);
  }

  const onBlur = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.FocusEvent<HTMLInputElement>) => {
    applyChangeName(folderOrfile, e.target.value);
  }

  const onKeyDown = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyChangeName(folderOrfile, e.currentTarget.value);
    }
  }

  const changeName = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(rootFolder === null) return;
    recursiveUnselect(rootFolder);
    folderOrfile.isEditing = true;
    setRootFolder({...rootFolder});
  }

  const deleteFolderOrFile = (folderOrfile: TFolderWithOptions|TFileWithOptions) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(rootFolder === null) return;
    if(confirm(`정말 ${folderOrfile.isFolder? `폴더 "${folderOrfile.folder_name}"` : `파일 "${folderOrfile.file_name}"`}을 삭제하시겠습니까?`) === false) return;
    const parent = recursiveFindParent(rootFolder, folderOrfile);
    if(parent === null) return;
    const index = parent.files.indexOf(folderOrfile);
    parent.files.splice(index, 1);
    setRootFolder({...rootFolder});
    //서버에 폴더 구조 반영
    mutateFolder(rootFolder);
    //TODO: 서버에 파일 삭제 반영
    if(folderOrfile.isFolder) return;
    mutateDelete(folderOrfile.id);
  }

  const setMainPlot = (file: TFileWithOptions) => () => {
    if(rootFolder === null) return;
    recursiveFileUnpin(rootFolder);
    file.isPinned = true;
    setRootFolder({...rootFolder});
    mutateFolder(rootFolder);
    mutateSetMain(file.id);
  }

  const changeOrderItem = (getIndex:(index:number)=>number) => (file: TFileWithOptions|TFolderWithOptions) => {
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
    targetParent.files.splice(getIndex(targetIndex), 0, draggingItem);
    setRootFolder({...rootFolder});
    mutateFolder(rootFolder);
  }

  const changeOrderAfterItem = changeOrderItem((index) => index + 1);
  const changeOrderBeforeItem = changeOrderItem((index) => index);

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
    mutateFolder(rootFolder);
  }

  return {
    workspace_id,
    rootFolder,
    isLoading,
    isPending,
    error,
    isSelectedFolderExist,
    openFolder,
    openFolderForDrag,
    toggleFolder,
    clearSelect,
    createFolder,
    createFile,
    onBlur,
    onKeyDown,
    changeName,
    deleteFolderOrFile,
    setMainPlot,
    draggingItem,
    setDraggingItem,
    changeOrderAfterItem,
    changeOrderBeforeItem,
    changeOrderLastOfFolder,
  };
}
