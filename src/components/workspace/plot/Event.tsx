import { useRef, useState } from "react";
import CharacterModal from "./CharacterModal";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import DragDrop from "@/assets/workspace/plot/dragdropE.svg";
import ChooseCharacter from "@/assets/workspace/plot/choosecharacter.svg";
import {
  CharacterImg,
  CharacterModalBtn,
  EventColumnContainer,
  EventContainer,
  EventDeleteBtn,
  EventDragWrap,
  EventTitle,
} from "@/styles/workspace/plot/Event.styles";
import { PlotCharacterType } from "@/utils/APIs/mock/plot";
import AutoResizeInput from "./AutoResizeInput";
import UpdateModal from "./UpdateModal";
import useEventList from "@/hooks/workspace/plot/useEventList";

interface EventProps {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventCharacter: PlotCharacterType[];
  onDelete: (peventId: string) => void;
}

export default function Event({
  eventId,
  eventName,
  eventDescription,
  eventCharacter,
  onDelete,
}: EventProps) {
  const [modal, setModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const characterRef = useRef<HTMLDivElement>(null);
  const [updateModal, setUpdateModal] = useState<string | null>(null);

  const [title, setTitle] = useState<string>(eventName);
  const [content, setContent] = useState<string>(eventDescription);

  const { mutateEventName, mutateEventD } = useEventList();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    mutateEventName({ peventId: eventId, event_name: value });
  };

  // 사건 설명 수정
  const handleContentChange = (value: string) => {
    setContent(value);
    mutateEventD({ peventId: eventId, event_description: eventDescription });
  };

  // 사건 삭제
  const deleteEvent = () => {
    onDelete(eventId);
  };

  return (
    <div style={{ position: "relative" }}>
      <EventDragWrap>
        <DragDrop />
      </EventDragWrap>
      <EventContainer>
        <EventColumnContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <CharacterModalBtn
                type="button"
                ref={buttonRef}
                onClick={() => setModal(!modal)}
              >
                <ChooseCharacter />
              </CharacterModalBtn>
              {eventCharacter.map((character) => (
                <CharacterImg
                  ref={characterRef}
                  key={character.id}
                  onClick={() => setUpdateModal(character.id)}
                  $src={character.ch_image}
                />
              ))}
            </div>
            {updateModal !== null && (
              <UpdateModal
                onClose={() => setUpdateModal(null)}
                characterId={updateModal}
              />
            )}
            <EventDeleteBtn onClick={deleteEvent}>
              <DeleteIcon />
            </EventDeleteBtn>
          </div>
          <EventTitle
            value={eventName}
            onChange={handleNameChange}
            placeholder="사건 제목을 적어주세요."
          />
          <AutoResizeInput
            isEvent={true}
            value={content}
            onChange={handleContentChange}
            placeholder="사건 내용을 적어주세요."
          />
        </EventColumnContainer>
      </EventContainer>
      {modal && (
        <CharacterModal
          eventId={eventId}
          character={eventCharacter}
          onClose={() => setModal(false)}
        />
      )}
    </div>
  );
}
