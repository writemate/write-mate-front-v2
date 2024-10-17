import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { TPlotEvent } from "@/utils/APIs/types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import { useMutation } from "@tanstack/react-query";

interface EventListProps {
  pevent: TPlotEvent[];
}

export const EventList = ({ pevent }: EventListProps) => {
  const { items: eventList, handleDragAndDrop } =
    useDragAndDrop<TPlotEvent>(pevent);

  // [사건]
  // 사건 추가
  //const createEvent = useMutation();

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <Droppable droppableId="eventList">
        {(provided) => (
          <div
            style={{ width: "100%" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {eventList.map((event, index) => (
              <Draggable key={event._id} draggableId={event._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Event
                      eventCharacter={event.pevent_character}
                      eventName={event.event_name}
                      eventDescription={event.event_description}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
