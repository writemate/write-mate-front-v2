"use client";
import { media } from "@/styles/media";
import { clickable } from "@/styles";
import { styled, css } from "styled-components";
import Link from "next/link";
import { HighlghtCssForHoberAfter } from ".";

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
    width: 100%;
    height: fit-content;
    align-items: flex-start;
    justify-content: space-between;
    padding: 15px;
    border-radius: 0;
    background-color: ${({ theme }) => theme.color.orange100};
  }
`;

export const SideTabMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 240px;

  ${media.tablet} {
    width: 100%;
    flex-direction: row;
    margin: 0;
    align-items: center;
    gap: 4px;
  }
`;

export const LogoLink = styled(Link)`
  margin-bottom: 88px;

  ${media.tablet} {
    display: block;
    align-self: center;
    padding: 0;
    margin: 0;
    scale: 0.8;
    svg {
      width: 40px;
    }
  }
`;

const SideTabSVG = css<{ $isActivated?: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
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

  ${media.tablet} {
    scale: 0.9;
    width: fit-content;
    margin-bottom: 0;
    word-break: keep-all;
    text-align: center;

    svg {
      display: none;
    }

    &:hover::after {
      display: none;
    }

    &:hover {
      color: ${({ theme }) => theme.color.orange400};
    }
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

  ${media.tablet} {
    display: none;
  }
`;
