import { useEffect, useRef, useState } from "react";
import CharacterModal from "./CharacterModal";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ChooseCharacter from "@/assets/workspace/plot/choosecharacter.svg";
import {
  CharacterModalBtn,
  EventColumnContainer,
  EventContainer,
  EventDeleteBtn,
  EventTitle,
} from "@/styles/workspace/plot/Event.styles";
import { PlotCharacterType } from "@/utils/APIs/mock/plot";
import AutoResizeInput from "./AutoResizeInput";

interface EventProps {
  eventId: string;
  eventName: string;
  eventDescription: string;
  eventCharacter: PlotCharacterType[];
}

export default function Event({
  eventId,
  eventName,
  eventDescription,
  eventCharacter,
}: EventProps) {
  const [modal, setModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [content, setContent] = useState<string>(eventDescription);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  // 사건 삭제
  //const deleteEvent = useMutation();

  return (
    <div style={{ position: "relative" }}>
      <EventContainer>
        <EventColumnContainer>
          <div>
            <CharacterModalBtn
              type="button"
              ref={buttonRef}
              onClick={() => setModal(!modal)}
            >
              <ChooseCharacter />
            </CharacterModalBtn>
            <EventDeleteBtn>
              <DeleteIcon />
            </EventDeleteBtn>
          </div>
          <EventTitle value={eventName} placeholder="사건 제목을 적어주세요." />
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
