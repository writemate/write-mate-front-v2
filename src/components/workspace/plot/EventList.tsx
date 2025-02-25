import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import useEventList from "@/hooks/workspace/plot/useEventList";
import Add from "@/assets/workspace/plot/add.svg";
import { TPlotEvent } from "@/utils/APIs/types";
import {
  EventContainer,
  EventListContainer,
} from "@/styles/workspace/plot/Event.styles";
import { IconButton } from "@/styles/workspace/plot/Chapter.styles";

interface EventListProps {
  pevent: TPlotEvent[];
  chapterId: string;
}

export const EventList = ({ pevent, chapterId }: EventListProps) => {
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
                <>
                  {event.id && (
                    <Draggable
                      key={event.id}
                      draggableId={event.id}
                      index={index}
                    >
                      {(provided) => (
                        <EventContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          id={"e" + event.id}
                        >
                          <Event {...event} chapterId={chapterId} />
                        </EventContainer>
                      )}
                    </Draggable>
                  )}
                  {!event.id && (
                    <EventContainer key={index}>
                      <Event {...event} chapterId={chapterId} />
                    </EventContainer>
                  )}
                </>
              ))}
              {provided.placeholder}
            </EventListContainer>
          )}
        </Droppable>
      </DragDropContext>
      <IconButton onClick={onClickCreate}>
        <Add />
      </IconButton>
    </>
  );
};
