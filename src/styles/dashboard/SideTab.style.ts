"use client";
import { styled } from "styled-components";
import {
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "..";
import Link from "next/link";
import { media } from "@/styles/media";
import {
  BlackTextIconHoverBackgroundButton,
  FullLogo,
  HighlghtCssForHoberAfter,
  OrangeBlodTextIconHoverBackgroundButton,
  Round9999OrangeBackgoundWhiteColor,
  WRogo,
} from "@/styles/Button";

export const SideTabMenu = styled.div`
  ${FlexColumnLeftStart}
  margin-bottom: 240px;
`;

export const LogoLink = styled(Link)`
  margin-bottom: 88px;

  .logo-small {
    display: none;
  }

  .logo-full {
    ${FullLogo}
  }

  ${media.tablet} {
    .logo-small {
      ${WRogo}
    }

    .logo-full {
      display: none;
    }
  }
`;

export const SideTabLink = styled(Link)<{ $isActivated?: boolean }>`
  ${({ $isActivated }) =>
    $isActivated
      ? OrangeBlodTextIconHoverBackgroundButton
      : BlackTextIconHoverBackgroundButton}
  position: relative;
  margin-bottom: 10px;
  padding: 5px;

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    left: -5%;
    width: 110%;
    height: 100%;
  }
`;

export const AddWorkspaceButton = styled.button`
  ${Round9999OrangeBackgoundWhiteColor}
  width: 100%;
`;

export const SideTabContainer = styled.div`
  ${FlexColumnCenter}
  width: 228px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 12px 0px 0px 12px;
  padding: 31px;

  ${media.tablet} {
    ${FlexRowSpaceBetween}
    width: 100%;
    height: fit-content;
    padding: 5px 15px 5px 10px;

    border-radius: 0;
    background-color: ${({ theme }) => theme.color.orange100};
    box-shadow: none;

    ${SideTabMenu} {
      ${FlexRowLeftStart}
      width: 100%;
      margin: 0;
      align-items: center;
      gap: 4px;
    }
    ${LogoLink} {
      display: block;
      align-self: center;
      margin: 0;
    }
    ${SideTabLink} {
      width: fit-content;
      margin-bottom: 0;
      word-break: keep-all;
      text-align: center;
      & > svg {
        display: none !important;
      }
      &:hover::after {
        display: none !important;
      }
    }

    ${AddWorkspaceButton} {
      display: none !important;
    }
  }
`;
