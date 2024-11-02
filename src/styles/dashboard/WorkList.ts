"use client";
import {
  FlexRowLeftStart,
  clickable,
  FlexColumnCenter,
  Button,
} from "@/styles";
import Link from "next/link";
import { styled, css } from "styled-components";
import { HighlghtCssForHoberAfter } from ".";
import exp from "constants";
// MainContainer
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
  position: relative;
  padding: 20px;
  overflow-y: auto;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
`;

export const WorkButton = styled(Link)`
  position: relative;

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
    outline: 1px solid ${({ theme }) => theme.color.orange300};
  }
`;

export const WorkButtonImage = styled.img`
  width: 184px;
  height: 256px;
  flex-shrink: 0;

  border-radius: 20px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.1) 100%
    ),
    url(<path-to-image>) lightgray -2.143px -11.562px / 102.329% 113.287%
      no-repeat;

  margin-bottom: 12px;
`;

export const WorkButtonTitle = styled.div`
  width: 135px;
  height: 18px;
  flex-shrink: 0;

  overflow: hidden;
  color: var(--Main-Color-Point-Color, var(--writemate-gray-900, #353535));
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%; /* 16.8px */

  margin-bottom: 4px;
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
  position: absolute;
  bottom: 14px;
  right: 8px;

  border: none;
  background: none;

  border-radius: 3px;
  pointer-events: auto; /* 버튼이 Link 위에 클릭되도록 설정 */

  &:hover::before {
    ${HighlghtCssForHoberAfter}
    width: 110%;
    height: 110%;
    top: -5%;
    left: -5%;
    border-radius: inherit;
  }

  background: ${({ $isOpen }) =>
    $isOpen ? "var(--writemate-gray-100, #f5f5f5)" : "none"};
`;

export const KebabDropdownContainer = styled.div`
  position: relative;
  top: 0px;
  left: 160px;
  display: flex;
  width: 132px;
  padding: 6px 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(30, 33, 43, 0.2);

  z-index: 10000;
`;

export const KebabDropdownButton = styled(Button)<{
  $isActivated?: boolean;
  $isMajor?: boolean;
  $isLast?: boolean;
}>`
  ${clickable}
  display: flex;
  width: 113px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 4px;
  border-bottom: 1px solid
    ${({ theme, $isLast }) => ($isLast ? "none" : theme.color.gray75)};

  color: ${({ theme, $isMajor }) =>
    $isMajor ? theme.color.red600 : theme.color.black};
  text-align: center;

  /* Writemate_MVP2/B6_R_13 */
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%; /* 17.55px */

  &:hover {
    background: ${({ theme, $isMajor }) =>
      $isMajor ? theme.color.red200 : theme.color.gray75};
  }
`;
