import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import useEventList from "@/hooks/workspace/plot/useEventList";
import Add from "@/assets/workspace/plot/add.svg";
import { TPlotEvent } from "@/utils/APIs/types";
import { EventContainer, EventListContainer } from "@/styles/workspace/plot/Event.styles";

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
            <EventListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pevent.map((event, index) => (
                <Draggable key={event.id} draggableId={event.id} index={index}>
                  {(provided) => (
                    <EventContainer
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Event {...event} chapterId={chapterId} />
                    </EventContainer>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </EventListContainer>
          )}
        </Droppable>
      </DragDropContext>
      <Add onClick={onClickCreate}/>
    </>
  );
};
