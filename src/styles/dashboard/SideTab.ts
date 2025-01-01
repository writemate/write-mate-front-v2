"use client";
import { media } from "@/styles/media";
import { clickable } from "@/styles";
import { styled, css } from "styled-components";
import Link from "next/link";
import { HighlghtCssForHoberAfter } from ".";
import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import {
  HeaderContainer,
  HeaderLeftButton,
  HeaderRightButton,
  HeaderRightButtonList,
  HearderProfileButton,
} from "./Header";

export const SideTabMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 240px;
`;

export const LogoLink = styled(Link)`
  margin-bottom: 88px;

  .logo-small {
    display: none;
  }

  .logo-full {
    display: block;
    width: 100%;
  }

  ${media.tablet} {
    .logo-small {
      display: block;
      width: 35px;
      padding: 5px;
    }

    .logo-full {
      display: none;
    }
  }
`;

const SideTabSVG = css<{ $isActivated?: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  gap: 10px;
  color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange400 : theme.color.gray400};
  font-weight: ${({ $isActivated }) => ($isActivated ? 700 : 500)};
`;

export const SideTabLink = styled(Link)<{ $isActivated?: boolean }>`
  ${SideTabSVG}
  margin-bottom: 10px;
  padding: 5px;
  align-item: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  &:hover::after {
    ${HighlghtCssForHoberAfter}
    left: -5%;
    width: 110%;
    height: 100%;
    z-index: -1;
  }
`;

export const AddWorkspaceButton = styled.button`
  ${clickable}
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.orange400};
  border: none;

  box-shadow: 0px 0px 8px 0px rgba(255, 84, 0, 0.2);

  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 0.32px;
  max-width: 177px;

  &:hover {
    filter: brightness(95%);
  }
`;

export const HamburgerMenuButton = styled(HamburgerMenu)`
  display: none;

  ${media.tablet} {
    ${clickable}
    display: block;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const HamburgerMenuContainer = styled.div`
  display: none;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  height: 100%;
  width: 100%;
  padding: 0 15px;
  gap: 15px;

  ${HeaderContainer} {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: none;
    box-shadow: none;
    gap: 0;
    outline: none;
    svg {
      display: none;
    }
    & > p {
      color: ${({ theme }) => theme.color.gray400};
    }
  }

  ${HeaderLeftButton} {
    background: none;
    box-shadow: none;
    outline: none;
    & > p {
      color: ${({ theme }) => theme.color.gray400};
    }
  }

  ${HeaderRightButtonList} {
    display: flex;
    flex-direction: column;
    background: none;
    box-shadow: none;
    gap: 0;
  }

  ${HeaderRightButton} {
    width: 100%;
    background: none;
    box-shadow: none;
    outline: none;
    & > p {
      display: flex;
      color: ${({ theme }) => theme.color.gray400};
    }
  }

  ${HearderProfileButton} {
    width: 100%;
    background: none;
    box-shadow: none;
    outline: none;
    & > p {
      display: flex;
      color: ${({ theme }) => theme.color.gray400};
    }
  }

  ${media.tablet} {
    display: flex;

    ${HeaderContainer} {
      display: flex;
      flex-direction: column;
      padding: 0;
      margin-bottom: 0;
    }
  }
`;

export const SideTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 228px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.08);
  border-radius: 12px 0px 0px 12px;
  padding: 31px;

  ${media.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: fit-content;
    padding: 5px 15px 5px 10px;

    border-radius: 0;
    background-color: ${({ theme }) => theme.color.orange100};
    box-shadow: none;

    ${SideTabMenu} {
      width: 100%;
      flex-direction: row;
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
      font-size: 14px;
      width: fit-content;
      margin-bottom: 0;
      word-break: keep-all;
      text-align: center;

      & > svg {
        display: none;
      }
      &:hover::after {
        display: none;
      }
      &:hover {
        color: ${({ theme }) => theme.color.orange400};
      }
    }

    ${AddWorkspaceButton} {
      display: none;
    }

    ${HamburgerMenuContainer} {
      display: flex;

      ${HeaderContainer} {
      }
    }
  }
`;
