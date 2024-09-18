import { useState, useCallback, useContext, useRef } from 'react';
import { TFileWithOptions, TFolderWithOptions } from '@/utils/APIs/types';
import { SidebarContext } from "@/stores/sidebarContext";

export const useDrag = (data: TFileWithOptions | TFolderWithOptions) => {
  const { setDraggingItem, changeOrderAfterItem, changeOrderLastOfFolder, openFolderForDrag } = useContext(SidebarContext);
  const [isDragOver, setIsDragOver] = useState(false);
  const timer = useRef<NodeJS.Timeout|null>(null);

  const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    setDraggingItem(data);
  }, [data]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(true);
    e.preventDefault();

    //폴더에 1초 이상 마우스를 올려놓으면 폴더를 열어준다.
    if(!data.isFolder) return;
    if(data.isOpen) return;
    if(timer.current) return;
    timer.current = setTimeout(() => {
      openFolderForDrag(data);
    }, 500);
  }

  const onDragLeave = () => {
    setIsDragOver(false);
    if(!timer.current) return;
    clearTimeout(timer.current);
    timer.current = null;
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.nativeEvent.offsetY, e);
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
