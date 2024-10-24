import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

interface HasOrder {
  order: number;
  [key: string]: any; // 다른 속성도 허용
}

const useDragAndDrop = <T extends HasOrder>(initialItems: T[]) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const handleDragAndDrop = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setItems(updatedItems);
  };

  return {
    items,
    handleDragAndDrop,
  };
};

export default useDragAndDrop;
