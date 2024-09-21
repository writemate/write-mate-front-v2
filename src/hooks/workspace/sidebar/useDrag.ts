import { useState, useCallback, useContext, useRef } from 'react';
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { SidebarContext } from "@/stores/sidebarContext";
import usePlotSidebar from '@/hooks/workspace/sidebar/usePlotSidebar';

enum DragOverType {
  None,
  Before,
  After,
}

const getDragOverType = (e: React.DragEvent<HTMLDivElement>) => {
  if(e.nativeEvent.offsetY < e.currentTarget.offsetHeight / 2){
    return DragOverType.Before;
  }
  return DragOverType.After;
}

export const useRootDrag = ({ rootFolder, draggingItem, setDraggingItem, changeOrderLastOfFolder }: ReturnType<typeof usePlotSidebar>) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(draggingItem === null) return;
    setIsDragOver(true);
  }

  const onDragLeave = () => {
    setIsDragOver(false);
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if(rootFolder === null) return;
    changeOrderLastOfFolder(rootFolder);
    setIsDragOver(false);
    setDraggingItem(null);
  };

  return {
    isDragOver,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}

export const useDrag = (data: TFileWithOptions | TFolderWithOptions) => {
  const { draggingItem, setDraggingItem, changeOrderAfterItem, changeOrderBeforeItem, changeOrderLastOfFolder, openFolderForDrag } = useContext(SidebarContext);
  const [dragOver, setDragOver] = useState(DragOverType.None);

  const isDragOver = dragOver !== DragOverType.None;
  const isDragOverBefore = dragOver === DragOverType.Before;
  const isDragOverAfter = dragOver === DragOverType.After;

  const timer = useRef<NodeJS.Timeout|null>(null);

  const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setDraggingItem(data);
  }, [data]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if(draggingItem === null || draggingItem === data) return;
    setDragOver(getDragOverType(e));

    //폴더에 1초 이상 마우스를 올려놓으면 폴더를 열어준다.
    if(!data.isFolder) return;
    if(data.isOpen) return;
    if(timer.current) return;
    timer.current = setTimeout(() => {
      openFolderForDrag(data);
    }, 500);
  }

  const onDragLeave = () => {
    setDragOver(DragOverType.None);
    if(!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if(isDragOverBefore){
      changeOrderBeforeItem(data);
    }
    if(data.isFolder && isDragOverAfter){
      changeOrderLastOfFolder(data);
    }
    if(!data.isFolder && isDragOverAfter){
      changeOrderAfterItem(data);
    }
    setDragOver(DragOverType.None);
    setDraggingItem(null);
  };

  return {
    isDragOver,
    isDragOverBefore,
    isDragOverAfter,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}
