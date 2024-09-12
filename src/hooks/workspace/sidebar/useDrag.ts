import { useState, useCallback, useContext } from 'react';
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { SidebarContext } from "@/stores/sidebarContext";

export const useDrag = (data: TFileWithOptions | TFolderWithOptions) => {
  const { draggingItem, setDraggingItem, changeOrderBeforeItem, changeOrderLastOfFolder } = useContext(SidebarContext);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setDraggingItem(data);
  }, [data]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggingItem) return;
    if(data.isFolder){
      changeOrderLastOfFolder(data);
    }else{
      changeOrderBeforeItem(data);
    }
    setIsDragOver(false);
    setDraggingItem(null);
  };

  return {
    draggingItem,
    isDragOver,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}
