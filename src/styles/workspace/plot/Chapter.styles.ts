import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { FlexColumnCenter, FlexRowCenter, FlexRowLeftStart } from "@/styles";
import { media } from "@/styles/media";

export const ChapterContainer = styled.section<{ $isDraggable?: boolean }>`
  ${FlexRowLeftStart};
  width: 100%;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.color.orange400};
  margin-bottom: 18.18px;
  padding: 20px 20px 20px
    ${({ $isDraggable = true }) => ($isDraggable ? "0" : "20px")};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  ${media.tablet} {
    padding: 12px 12px 12px
      ${({ $isDraggable = true }) => ($isDraggable ? "0" : "12px")};
    margin-bottom: 12px;
  }
`;

export const ChapterDragWrap = styled.div`
  ${FlexRowCenter};
  height: fit-content;
  width: 40px;
  padding: 10px;
  flex-shrink: 0;
  & > svg {
    width: 16px;
    height: 16px;
  }

  ${media.tablet} {
    padding: 4px;
    width: 20px;

    & > svg {
      width: 12px;
      height: 12px;
    }
  }
`;

export const ChapterCard = styled.div`
  ${FlexColumnCenter};
  width: 100%;
`;

export const IconButton = styled.button`
  width: fit-content;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  svg {
    width: 28px;
    height: 28px;
  }

  ${media.tablet} {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const ChapterHeader = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  padding-bottom: 8px;
`;

export const TitleInput = styled.input`
  height: 36px;
  text-overflow: clip;
  width: 100%;
  flex-shrink: 1;
  border: none;
  outline: none;

  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  display: inline-block;
  color: ${({ theme }) => theme.color.gray900};
  &:disabled {
    background: none;
  }

  ${media.tablet} {
    height: 24px;
    font-size: 14px;
  }
`;

export const Description = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray900};
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
