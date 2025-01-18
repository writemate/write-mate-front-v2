import { DropResult } from "react-beautiful-dnd";

interface DragAndDropProps{
  mutationOrderFn: (params: {
    itemId: string;
    pre_idx: number;
    next_idx: number;
  }) => () => void;
}

export const getHandleDragAndDropFunctionForReorder =
 ({ mutationOrderFn }: DragAndDropProps) =>
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      if (!destination) return;
      if (destination.index === source.index) return;

      mutationOrderFn({
        itemId: draggableId,
        pre_idx: source.index,
        next_idx: destination.index,
      })();
    };
