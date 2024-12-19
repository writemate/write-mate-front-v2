import { colorSystem } from "@/styles/colorSystem";
import styled from "styled-components";
import { ChapterDragWrap, IconButton } from "./Chapter.styles";
import { FlexColumnLeftStart, FlexRowLeftStart } from "@/styles";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import TextareaAutosize from "react-textarea-autosize";

export const EventListContainer = styled.div`
  ${FlexColumnLeftStart};
  width: 100%;
  gap: 12px;
  margin: 20px 0;
`;

export const EventContainer = styled.div`
  ${FlexRowLeftStart};
  padding: 20px 20px 20px 0;
  width: 100%;
  margin-bottom: 12px;

  background: ${colorSystem.gray25};
  border: 1px solid #d7ddea;
  border-radius: 8px;
`;

export const EventDragWrap = styled(ChapterDragWrap)`
  width: 31px;
  padding: 10px 6px;
`;

export const EventHeader = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  gap: 4px;
  position: relative;
`;

export const EventDeleteBtn = styled(DeleteIcon)`
  cursor: pointer;
  margin-left: auto;
`;

export const CharacterModalBtn = styled(IconButton)`
`;

export const CharacterImg = styled.div<{ $src: string }>`
  width: 24px;
  height: 24px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  box-shadow: 2px 2px 8px #323f4d33;
  border: 2px solid #fff;
  margin-left: 4px;
  cursor: pointer;
  margin-top: 3px;
`;

export const EventColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EventTitle = styled.input`
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
  outline: none;

  color: ${({ theme }) => theme.color.gray900};
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  background: transparent;
  margin-bottom: 5px;
  margin-top: 16px;
`;


export const EventDescription = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray900};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray300};
  }
`;
