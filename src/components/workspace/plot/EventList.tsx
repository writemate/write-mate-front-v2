import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Event from "./Event";
import { PlotEventType } from "@/utils/APIs/mock/plot";
import useEventList from "@/hooks/workspace/plot/useEventList";
import Add from "@/assets/workspace/plot/add.svg";
import { AddButton } from "@/styles/workspace/plot/Chapter.styles";

interface EventListProps {
  pevent: PlotEventType[];
}

export const EventList = ({ pevent }: EventListProps) => {
  const { mutateCreateE, mutateDeleteE, mutateEventO } = useEventList();

  const {
    items: eventList,
    setItems: setEventList,
    handleDragAndDrop,
  } = useDragAndDrop<PlotEventType>({
    mutationOrderFn: async ({ itemId, pre_idx, next_idx }) =>
      mutateEventO({ peventId: itemId, pre_idx, next_idx }),
  });

  // 사건 추가
  const handleAddEvent = () => {
    // mock
    const mockEvent: PlotEventType = {
      id: "",
      event_description: "",
      event_name: "",
      order: eventList.length,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      character_list: [],
    };
    setEventList((prevEvent) => [...prevEvent, mockEvent]);

    mutateCreateE();
  };

  // 사건 삭제
  const handleDeleteEvent = (peventId: string) => {
    setEventList((prevEvents) =>
      prevEvents.filter((event) => event.id !== peventId)
    );
    mutateDeleteE(peventId);
  };

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
                        onDelete={handleDeleteEvent}
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

      <AddButton type="button" onClick={handleAddEvent}>
        <Add />
      </AddButton>
    </>
  );
};
