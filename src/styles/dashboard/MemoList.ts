"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import Copy from "@/assets/icons/copy.svg";
import OpenModal from "@/assets/icons/openModal.svg";
import TextareaAutosize from "react-textarea-autosize";

export const MemoCard = styled.div`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(19, 19, 19, 0.06);
  margin-bottom: 6px;
  padding: 8px;

  &:focus-within {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
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
  min-height: calc(14px * 1.5 * 3); /* font-size * line-height * 3줄 */

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

export const MemoListContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  & > .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const AddMemoButton = styled.button`
  ${clickable}
  position: fixed;
  left: calc(50% - 88.5px);
  bottom: 70px;

  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--writemate-orange-400, #f49661);
  border: none;

  box-shadow: 0px 0px 8px 0px rgba(255, 84, 0, 0.2);

  color: var(--white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 16px */
  letter-spacing: 0.32px;
  max-width: 177px;

  &:hover {
    transform: scale(1.05); /* 살짝 확대 효과 */
    filter: brightness(105%);
  }
`;

export const OpenButton = styled(OpenModal)`
  ${clickable}
  width: 18px;
`;

export const HiddenMemoListContainer = styled(MemoListContainer)`
  visibility: hidden;
  height: 0;
  padding: 0;
  margin: 0;
`;
