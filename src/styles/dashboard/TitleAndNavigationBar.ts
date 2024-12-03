"use client";
import {
  FlexRowLeftStart,
  clickable,
  FlexColumnCenter,
  Button,
} from "@/styles";
import { styled } from "styled-components";
import { HighlghtCssForHoberAfter } from ".";

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

  @media (max-width: 400px) {
    display: none;
  }
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
    ${HighlghtCssForHoberAfter}
    width: 90%;
    height: 70%;
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
  @media (max-width: 400px) {
    margin-left: 0;
    scale: 0.9;

    &::before {
      bottom: -4px;
    }
  }
`;
