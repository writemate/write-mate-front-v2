"use client";
import { media } from "@/styles/media";
import { FlexRowLeftStart, FlexColumnCenter } from "@/styles";
import { styled } from "styled-components";
import { FontBold28 } from "../Font";
import {
  BlackTextIconHoverBackgroundButton,
  HighlghtCssForHoberAfter,
  OrangeBlodTextIconHoverBackgroundButton,
  underLineHighlight,
} from "../Button";

export const TitleAndNavigationBar = styled.div`
  ${FlexColumnCenter}
  padding:  0 20px;
  width: 100%;
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  ${FontBold28}
  color: ${({ theme }) => theme.color.gray900};
  width: 100%;
  margin-bottom: 48px;

  ${media.tablet} {
    display: none;
  }
`;

// NavigationBar
export const NavigationBar = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  margin-bottom: 4px;
  gap: 32px;

  :last-child {
    svg {
      visibility: hidden;
    }
  }
  ${media.tablet} {
    :last-child {
      visibility: visible;
      margin-left: auto;
      margin-right: 16px;
    }
  }
`;

export const NavigationButton = styled.button<{ $isActivated?: boolean }>`
  ${({ $isActivated }) =>
    $isActivated
      ? OrangeBlodTextIconHoverBackgroundButton
      : BlackTextIconHoverBackgroundButton}
  ${underLineHighlight}
  position: relative;
  width: fit-content;
  margin-left: 16px;
  background-color: transparent;
  padding-bottom: 4px;

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    left: -8px;
    width: calc(100% + 16px);
    height: 70%;
  }
`;
