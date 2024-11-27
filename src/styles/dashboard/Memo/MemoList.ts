"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import Copy from "@/assets/icons/copy.svg";
import OpenModal from "@/assets/icons/openModal.svg";
import TextareaAutosize from "react-textarea-autosize";

interface MemoCardProps {
  $isSelected?: boolean;
}

export const MemoCard = styled.div<MemoCardProps>`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(19, 19, 19, 0.06);
  margin-bottom: 6px;
  padding: 8px;
  visibility: ${({ $isSelected }) => ($isSelected ? "hidden" : "visible")};
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

interface AddMemoButtonProps {
  $isEmpty?: boolean;
}
export const AddMemoButton = styled.button<AddMemoButtonProps>`
  ${clickable}
  position: fixed;
  left: calc(50% - 88.5px);
  bottom: ${({ $isEmpty }) => ($isEmpty ? "calc(50% - 120px)" : "50px")};

  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.gray300};
  border: none;

  color: ${({ theme }) => theme.color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 0.32px;
  max-width: 177px;

  &:hover {
    filter: brightness(95%);
  }
`;

export const OpenButton = styled(OpenModal)`
  ${clickable}
  width: 18px;
`;

export const MemoListContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  align-items: start;
  justify-content: start;
  gap: 16px;
  padding: 16px;
  padding-bottom: 100px;
  width: 100%;
  overflow-y: auto;

  ${MemoCard} {
    padding: 13px;
    gap: 4px;
    &:hover {
      outline: 1px solid ${({ theme }) => theme.color.orange400};
    }
    &:focus-within {
      outline: 1px solid ${({ theme }) => theme.color.orange400};
    }
  }
  ${MemoContent} {
    min-height: calc(14px * 1.5 * 6);
  }
`;
export const MemoUpdatedDate = styled.div`
  align-self: flex-end;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.color.gray300};
`;
export const MemoModalContainer = styled.div`
  ${FlexColumnCenter}
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 0px;
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 8px;

  button {
    ${clickable}
    flex-shrink: 0;
    padding: 0px 8px;
    height: 24px;

    font-size: 14px;
    font-weight: 500;
    background: none;
    border: none;

    color: ${({ theme }) => theme.color.gray300};
    &:hover {
      color: ${({ theme }) => theme.color.orange400};
    }
  }

  ${MemoHeader} {
    gap: 4px;
  }
  ${MemoTitle} {
    font-size: 18px;
    padding: 8px 8px;
    color: ${({ theme }) => theme.color.black};
    flex-wrap: wrap;
    overflow-x: scroll;
  }

  ${MemoContent} {
    overflow-y: scroll;
    color: ${({ theme }) => theme.color.gray900};
    max-height: 80vh;
    font-size: 16px;
    line-height: 160%;
    padding: 0px 8px;
  }

  ${MemoUpdatedDate} {
    align-self: center;
    flex-shrink: 0;
    font-size: 14px;
  }
`;

export const MemoModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MemoModalBottom = styled.div`
  ${FlexRowSpaceBetween}
  width: 100%;
  padding: 8px;
  border-top: 1px solid ${({ theme }) => theme.color.gray200};
`;
