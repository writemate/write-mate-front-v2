"use client";
import { FlexRowLeftStart, clickable, FlexColumnCenter } from "@/styles";
import { styled, css } from "styled-components";

export const HighlghtCssForHoberAfter = css<{ $isActivated?: boolean }>`
  content: "";
  position: absolute;
  background-color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange200 : theme.color.gray200};
  opacity: 0.3;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
`;

/* Dashboard */
export const DashboardContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-start;
  padding: 16px 28px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.orange100};
  z-index: 0;

  @media (max-width: 400px) {
    flex-direction: column;
    padding: 0;
  }
`;

/* SideTab And Footer (FlexColumn)*/
export const SideTabAndFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 400px) {
    width: 100%;
    height: fit-content;
  }
`;

export const FooterContainer = styled.div<{ $isActivated?: boolean }>`
  ${clickable}
  position: relative;
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 8px;
  padding: 11px;
  color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange400 : theme.color.gray300};

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    top: 0;
    left: 0;
    width: 50%;
    z-index: -1;
  }

  @media (max-width: 400px) {
    display: none;
  }
`;

/* Header And Main (FlexColumn)*/
export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
  filter: drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.08));
  border-radius: 0px 12px 12px 12px;
  padding: 17px 20px;
  z-index: 0;

  @media (max-width: 400px) {
    width: 100%;
    border-radius: 0;
    padding: 0;
  }
`;
