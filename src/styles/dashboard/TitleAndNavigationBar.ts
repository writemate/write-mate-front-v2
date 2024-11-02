"use client";
import {
  FlexRowLeftStart,
  clickable,
  FlexColumnCenter,
  Button,
} from "@/styles";
import { styled, css } from "styled-components";

export const TitleAndNavigationBar = styled.div`
  ${FlexColumnCenter}
  padding:  0 20px;
  width: 100%;
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 48px;
`;

// NavigationBar
export const NavigationBar = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #cacdda;
  margin-bottom: 4px;
`;

export const NavigationButton = styled(Button)<{ $isActivated?: boolean }>`
  ${clickable}
  display: flex;
  width: fit-content;
  margin-left: 16px;
  font-weight: ${({ $isActivated }) => ($isActivated ? "bold" : "normal")};
  color: ${({ theme, $isActivated }) =>
    $isActivated ? theme.color.orange400 : theme.color.gray300};
  position: relative;
  background-color: transparent;

  &:hover::after {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    right: 10%;
    bottom: 10%;
    background-color: ${({ theme }) => theme.color.orange100};
    opacity: 0.5; /* 요소 전체 투명도 */

    border-radius: inherit; // 요소의 둥근 모서리가 적용되도록 설정
    z-index: -1;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    justify-self: center;
    width: 32.941px;
    height: 4px;
    background-color: ${({ theme, $isActivated }) =>
      $isActivated ? theme.color.orange400 : "transparent"};
    border-radius: 10px;
    transition: background-color 0.1s;
  }
`;
