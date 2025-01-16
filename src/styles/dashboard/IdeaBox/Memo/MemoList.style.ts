"use client";
import { styled } from "styled-components";
import { media } from "@/styles/media";
import { clickable, FlexColumnLeftStart, FlexRowSpaceBetween } from "@/styles";
import OpenModal from "@/assets/icons/openModal.svg";
import Copy from "@/assets/icons/copy.svg";
import TextareaAutosize from "react-textarea-autosize";
import { FontSemibold14, FontTabletRegular14 } from "@/styles/Font";
import { Round9999OrangeBackgoundWhiteColor } from "@/styles/Button";

interface MemoCardProps {
  $isSelected?: boolean;
}

export const MemoCard = styled.div<MemoCardProps>`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  visibility: ${({ $isSelected }) => ($isSelected ? "hidden" : "visible")};
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);
  border-radius: 8px;

  margin-bottom: 6px;
  padding: 13px;
  gap: 4px;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }

  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;

export const MemoHeader = styled.div`
  ${FlexRowSpaceBetween};
  width: 100%;
`;

export const MemoContent = styled(TextareaAutosize)`
  ${FontTabletRegular14}
  width: 100%;
  color: ${({ theme }) => theme.color.gray300};
  border: none;
  outline: none;
  resize: none;
  min-height: calc(14px * 1.5 * 6);

  &::placeholder {
    color: ${({ theme }) => theme.color.gray200};
  }
`;

export const MemoTitle = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  ${FontSemibold14}

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
  ${FontTabletRegular14}
  width: 100%;
  font-size: 12px;
  text-align: right;
  color: ${({ theme }) => theme.color.gray300};
`;

interface AddMemoButtonProps {
  $isEmpty?: boolean;
}
export const AddMemoButtonContainer = styled.button<AddMemoButtonProps>`
  ${clickable}
  ${Round9999OrangeBackgoundWhiteColor}
  position: fixed;
  bottom: ${({ $isEmpty }) => ($isEmpty ? "calc(50% - 120px)" : "40px")};
  min-width: 160px;
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

  ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;
