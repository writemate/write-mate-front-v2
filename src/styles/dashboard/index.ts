"use client";
import { media } from "@/styles/media";
import { FlexRowLeftStart, FlexColumnCenter } from "@/styles";
import { styled, css } from "styled-components";
import {
  GrayTextIconHoverBackgroundButton,
  HighlghtCssForHoberAfter,
} from "@/styles/Button";

/* Dashboard */
export const DashboardContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-start;
  padding: 16px 28px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.orange100};
  z-index: 0;

  ${media.tablet} {
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

  ${media.tablet} {
    width: 100%;
    height: fit-content;
    flex-direction: row;
    align-items: center;
    padding-right: 15px;
  }
`;

/* Header And Main (FlexColumn)*/
export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 0px 12px 12px 12px;
  padding: 17px 20px;
  z-index: 0;

  ${media.tablet} {
    width: 100%;
    height: calc(100% - 60px);
    border-radius: 12px 12px 0px 0px;
    padding: 0;
  }
`;

export const FooterContainer = styled.div<{ $isActivated?: boolean }>`
  ${GrayTextIconHoverBackgroundButton}
  width: fit-content;
  position: relative;

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    left: -8px;
    width: calc(100% + 16px);
  }

  ${media.tablet} {
    display: none;
  }
`;
