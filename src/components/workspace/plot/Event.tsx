import { TPlotEventCharacter } from "@/utils/APIs/types";
import styled from "styled-components";
import { IconButton } from "./Chapter";
import { useRef, useState } from "react";
import CharacterModal from "./CharacterModal";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ChooseCharacter from "@/assets/workspace/plot/choosecharacter.svg";
import { colorSystem } from "@/styles/colorSystem";

interface EventProps {
  eventName: string;
  eventDescription: string;
  eventCharacter: TPlotEventCharacter[];
}

export default function Event({
  eventName,
  eventDescription,
  eventCharacter,
}: EventProps) {
  const [modal, setModal] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 사건 삭제
  //const deleteEvent = useMutation();

  return (
    <>
      <EventContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div style={{ flexDirection: "row" }}>
            <button
              type="button"
              ref={buttonRef}
              style={{
                width: "24px",
                height: "24px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => setModal(!modal)}
            >
              <ChooseCharacter />
            </button>
            <IconButton
              style={{
                fontSize: "14.88px",
                float: "right",
                marginRight: "20px",
              }}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <EventTitle value={eventName} placeholder="사건 제목을 적어주세요." />
          <EventDescription
            value={eventDescription}
            placeholder="사건 내용을 적어주세요."
          />
        </div>
      </EventContainer>
      {modal && (
        <CharacterModal
          character={eventCharacter}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}

const EventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px 0 20px 31px;

  height: 139px;
  margin-bottom: 12px;

  background: ${colorSystem.gray25};
  border: 1px solid #d7ddea;
  border-radius: 8px;
`;

const EventTitle = styled.input`
  height: 30px;
  width: 95%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  border: none;

  color: rgba(0, 0, 0, 0.87);

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  background: transparent;
  margin-bottom: 5px;
  margin-top: 16px;
`;

const EventDescription = styled.textarea`
  height: 24px;
  width: 95%;
  background: transparent;
  resize: none;

  border: none;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;

  color: #353535;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
