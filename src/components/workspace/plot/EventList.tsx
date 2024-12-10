import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import { PlotEventType } from "@/utils/APIs/mock/plot";
import useEventList from "@/hooks/workspace/plot/useEventList";
import Add from "@/assets/workspace/plot/add.svg";
import { AddButton } from "@/styles/workspace/plot/Chapter.styles";
import { TPlotEvent } from "@/utils/APIs/types";

interface EventListProps {
  pevent: TPlotEvent[];
  chapterId: string;
}

export const EventList = ({ pevent,chapterId }: EventListProps) => {
  const { onClickCreate, handleDragAndDrop } = useEventList(chapterId);

  return (
    <>
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="eventList">
          {(provided) => (
            <div
              style={{ width: "100%" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pevent.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* <Event {...event}/> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddButton type="button" onClick={onClickCreate}>
        <Add />
      </AddButton>
    </>
  );
};
