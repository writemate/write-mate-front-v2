"use client";
import { styled } from "styled-components";
import { media } from "@/styles/media";
import { clickable, FlexColumnLeftStart, FlexRowSpaceBetween } from "@/styles";
import OpenModal from "@/assets/icons/openModal.svg";
import Copy from "@/assets/icons/copy.svg";
import TextareaAutosize from "react-textarea-autosize";

interface MemoCardProps {
  $isSelected?: boolean;
}

export const MemoCard = styled.div<MemoCardProps>`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);
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

export const OpenButton = styled(OpenModal)`
  ${clickable}
  width: 18px;
`;

export const MemoUpdatedDate = styled.div`
  align-self: flex-end;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.color.gray300};
`;

interface AddMemoButtonProps {
  $isEmpty?: boolean;
}
export const AddMemoButtonContainer = styled.button<AddMemoButtonProps>`
  ${clickable}
  position: fixed;

  bottom: ${({ $isEmpty }) => ($isEmpty ? "calc(50% - 120px)" : "40px")};

  width: 200px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.orange400};
  border: none;

  color: ${({ theme }) => theme.color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 0.32px;

  &:hover {
    filter: brightness(95%);
  }

  ${media.tablet} {
    scale: 0.9;
    bottom: 10px;
  }
`;

export const MemoListContainer = styled.div`
  position: relative;
  display: grid;
  height: calc(100vh - 80px);
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

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;
