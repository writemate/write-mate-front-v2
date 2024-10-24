import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import { useMutation } from "@tanstack/react-query";
import { PlotEventType } from "@/utils/APIs/mock/plot";

interface EventListProps {
  pevent: PlotEventType[];
}

export const EventList = ({ pevent }: EventListProps) => {
  const { items: eventList, handleDragAndDrop } =
    useDragAndDrop<PlotEventType>(pevent);

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
              <Draggable key={event.id} draggableId={event.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Event
                      eventId={event.id}
                      eventCharacter={event.character_list}
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
