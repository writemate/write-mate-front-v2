import { colorSystem } from "@/styles/colorSystem";
import styled, { css } from "styled-components";
import { ChapterDragWrap, IconButton } from "./Chapter.styles";
import { FlexColumnLeftStart, FlexRowLeftStart } from "@/styles";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import TextareaAutosize from "react-textarea-autosize";
import { media } from "@/styles/media";

export const EventListContainer = styled.div`
  ${FlexColumnLeftStart};
  width: 100%;
  margin: 20px 0;

  ${media.tablet} {
    margin: 12px 0;
  }
`;

export const EventContainer = styled.div<{ $isDraggable?: boolean }>`
  ${FlexRowLeftStart};
  padding: 20px 20px 20px
    ${({ $isDraggable = true }) => ($isDraggable ? "0" : "20px")};
  width: 100%;
  margin-bottom: 12px;

  background: ${colorSystem.gray25};
  border: 1px solid #d7ddea;
  border-radius: 8px;

  ${media.tablet} {
    padding: 12px 12px 12px
      ${({ $isDraggable = true }) => ($isDraggable ? "0" : "12px")};
    margin-bottom: 8px;
  }
`;

export const EventDragWrap = styled(ChapterDragWrap)`
  width: 32px;
  padding: 10px 6px;

  ${media.tablet} {
    padding: 4px 2px;
    width: 20px;
  }
`;

export const EventHeader = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  gap: 4px;
  position: relative;
  align-items: center;
`;

export const EventDeleteBtn = styled(DeleteIcon)`
  width: 32px;
  cursor: pointer;

  ${media.tablet} {
    width: 24px;
  }
`;

export const CharacterModalBtn = styled(IconButton)``;

export const CharacterImg = styled.div<{ $src: string }>`
  width: 24px;
  height: 24px;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  box-shadow: 2px 2px 8px #323f4d33;
  border: 2px solid #fff;
  cursor: pointer;

  ${media.tablet} {
    width: 20px;
    height: 20px;
  }
`;

export const EventColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const EventTitleCss = css`
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
  &:disabled {
    background: none;
  }

  ${media.tablet} {
    height: 24px;
    font-size: 14px;
    margin-top: 8px;
  }
`;
export const EventTitle = styled.input`
  ${EventTitleCss}
`;

export const EventTitleDiv = styled.div<{ $isBlank: boolean }>`
  ${EventTitleCss}
  margin-top: 5px;
  ${({ $isBlank, theme }) =>
    $isBlank &&
    `
      color: ${theme.color.gray300};
    `}
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
  &:disabled {
    background: none;
  }

  ${media.tablet} {
    height: 24px;
    font-size: 14px;
  }
`;
