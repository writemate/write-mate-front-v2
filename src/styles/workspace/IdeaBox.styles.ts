"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowSpaceBetween,
} from "@/styles";
import Close from "@/assets/icons/close.svg";
import Copy from "@/assets/icons/copy.svg";
import Add from "@/assets/icons/addButton.svg";
import TextareaAutosize from "react-textarea-autosize";

export const IdeaBoxContainer = styled.div`
  ${FlexColumnCenter}
  width: 309px; //수정 시 workspace/index.ts의 MainContainer padding-right 수정 필요
  height: 100%;
  border-left: 1px solid #d7dce7;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const IdeaBoxHeader = styled.div`
  ${FlexRowSpaceBetween}
  width: 100%;
  height: 64px;
  padding: 20px;
  border-bottom: 1px solid #edf2fc;
`;

export const IdeaBoxTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

export const IdeaBoxCloseButton = styled(Close)`
  ${clickable}
`;

export const SelectIdeaTypeContainer = styled.div`
  ${FlexRowCenter}
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #edf2fc;
`;

export const SelectIdeaTypeButton = styled.div<{ $isSelected: boolean }>`
  ${clickable}
  ${FlexRowCenter}
  width: 100%;
  height: 100%;
  font-size: 14px;
  position: relative;
  ${({ $isSelected }) =>
    $isSelected &&
    `
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 2px;
      background-color: #000000;
    }
  `}
`;

export const IdeaBoxContent = styled.div`
  ${FlexColumnCenter}
  width: 100%;
  height: calc(100% - 99px);
  padding: 20px;
  background-color: rgba(241, 245, 251, 0.43);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const MemoCard = styled.div`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(19, 19, 19, 0.06);
  margin-bottom: 6px;
  padding: 8px;
`;

export const MemoHeader = styled.div`
  ${FlexRowSpaceBetween};
  width: 100%;
`;

export const MemoContent = styled(TextareaAutosize)`
  width: 100%;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray300};
  border: none;
  outline: none;
  resize: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray200};
  }
`;

export const MemoTitle = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  border: none;
  outline: none;
`;

export const CopyButton = styled(Copy)`
  ${clickable}
`;

export const AddButton = styled(Add)`
  width: 24px;
  height: 24px;
  ${clickable}
`;
