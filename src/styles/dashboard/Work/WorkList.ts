"use client";
import { FlexRowLeftStart, clickable, FlexColumnCenter } from "@/styles";
import Link from "next/link";
import { styled } from "styled-components";
import { HighlghtCssForHoberAfter } from "..";

export const TitleAndWorkListContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;
`;

export const WorkButtonList = styled.div`
  ${FlexRowLeftStart}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow-y: auto;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
`;

export const EmptyListDiscription = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const WorkButtonContainer = styled(Link)`
  border: none;
  display: flex;
  width: 200px;
  height: 320px;
  padding: 8px 8px 12px 8px;
  flex-direction: column;
  flex-shrink: 0;

  border-radius: 12px;
  background: var(--white, #fff);

  /* Carditem shadow */
  box-shadow: 2px 2px 12px 0px rgba(19, 19, 19, 0.12);

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;

export const WorkButtonImage = styled.img`
  width: 100%;
  height: 256px;
  flex-shrink: 0;
  margin-bottom: 12px;

  border-radius: 20px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
`;
export const TitleAndDateAndKebab = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

export const TitleAndDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
`;

export const WorkButtonTitle = styled.div`
  width: 140px;
  height: 18px;
  overflow: hidden;
  color: var(--Main-Color-Point-Color, var(--writemate-gray-900, #353535));
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;

  margin-bottom: 4px;
  z-index: 100;    

  input {
    padding: 0px;
    border-radius: 3px;
    border: 1px solid transparent;
    box-shadow: 0 0 12px 0 #0000001a;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    overflow: visible;

    &:focus { 
      width: 100%;
      outline: none;
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;

export const WorkButtonDate = styled.div`
  color: #303030;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 10px */
`;

export const WorkButtonKebab = styled.div<{
  $isOpen: boolean;
  $isActivated?: boolean;
}>`
  ${clickable}
  position: relative;
  border: none;
  background: none;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 32px;
  height: 32px;

  &:hover::before {
    ${HighlghtCssForHoberAfter}
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  background: ${({ $isOpen }) =>
    $isOpen ? "var(--writemate-gray-100, #f5f5f5)" : "none"};
`;

export const ChangeCoverInput = styled.input`
  display: none;
`;
