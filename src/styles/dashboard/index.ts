"use client";
import {
  FlexRowLeftStart,
  clickable,
  FlexColumnCenter,
  Button,
} from "@/styles";
import { styled, css } from "styled-components";

export const HighlghtCssForHoberAfter = css<{ $isActivated?: boolean }>`
  content: "";
  position: absolute;
  background-color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange200 : theme.color.gray100};
  opacity: 0.2;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
`;

// DashboardContainer
export const DashboardContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-start;
  padding: 16px 28px;
  width: 100%;
  height: 100%;
  background-color: #fdefe7;
  z-index: 0;
`;

// SideTabAndFooterContainer
export const SideTabAndFooterContainer = styled.div`
  display: flex;
  padding: 17px 37px px;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const FooterContainer = styled.div<{ $isActivated?: boolean }>`
  ${clickable}
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  padding: 11px;
  color: #939393;

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    top: 0;
    left: 0;
    width: 50%;
    z-index: -1;
  }
`;

// HeaderAndMainContainer
export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  background-color: #ffffff;
  filter: drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.08));
  border-radius: 0px 12px 12px 12px;
  padding: 17px 20px;
  z-index: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 60px;
`;
