import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useMutation } from "@tanstack/react-query";

interface HasOrder {
  order: number;
  [key: string]: any; // 다른 속성도 허용
}

interface DragAndDropProps<T> {
  initialItems: T[];
  mutationFn: (params: {
    itemId: string;
    pre_idx: number;
    next_idx: number;
  }) => Promise<void>;
}

const useDragAndDrop = <T extends HasOrder>({
  initialItems,
  mutationFn,
}: DragAndDropProps<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);

  const { mutate } = useMutation({
    mutationFn,
  });

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
    mutate({
      itemId: movedItem.id,
      pre_idx: source.index,
      next_idx: destination.index,
    });
  };

  return {
    items,
    handleDragAndDrop,
  };
};

export default useDragAndDrop;
