import { useState, useCallback, useContext } from 'react';
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { SidebarContext } from "@/stores/sidebarContext";

export const useDrag = (data: TFileWithOptions | TFolderWithOptions) => {
  const { setDraggingItem, changeOrderAfterItem, changeOrderLastOfFolder } = useContext(SidebarContext);
  const [isDragOver, setIsDragOver] = useState(false);

  const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setDraggingItem(data);
  }, [data]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(true);
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(data.isFolder){
      changeOrderLastOfFolder(data);
    }else{
      changeOrderAfterItem(data);
    }
    setIsDragOver(false);
    setDraggingItem(null);
  };

  return {
    isDragOver,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
  };
}
