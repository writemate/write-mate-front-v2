import { DropResult } from "react-beautiful-dnd";

interface DragAndDropProps<T extends { id: string }> {
  mutationOrderFn: (params: {
    itemId: string;
    pre_idx: number;
    next_idx: number;
  }) => () => void;
  item: Array<T>;
}

export const getHandleDragAndDropFunctionForReorder =
  <T extends { id: string }>({ mutationOrderFn, item }: DragAndDropProps<T>) =>
    (result: DropResult) => {
      const { destination, source } = result;

      if (!destination) return;
      if (destination.index === source.index) return;
      const movedItem = item[source.index];

      mutationOrderFn({
        itemId: movedItem.id,
        pre_idx: source.index,
        next_idx: destination.index,
      })();
    };
