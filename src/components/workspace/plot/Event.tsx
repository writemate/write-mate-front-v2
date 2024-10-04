import { TPlotEventCharacter } from "@/utils/APIs/types";
import styled from "styled-components";

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
  return (
    <EventContainer>
      <button></button>
      <input value={eventName} />
      <input value={eventDescription} />
    </EventContainer>
  );
}

const EventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin-bottom: 12px;
  width: 952px;
  height: 139px;

  background: #f8fafe;
  border: 1px solid #d7ddea;
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
