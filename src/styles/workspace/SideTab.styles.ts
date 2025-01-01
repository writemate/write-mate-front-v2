"use client";
import { styled, css } from "styled-components";
import { clickable, FlexColumnCenter } from "@/styles";
import Link from "next/link";
import { media } from "../media";
import { FooterContainer } from "./Footer.styles";

export const LogoLink = styled(Link)`
  margin-bottom: 42px;
  width: 44px;
  padding: 5px;
`;

const SideTabSVG = css<{ $isActivated?: boolean }>`
  ${clickable}
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 0;
  color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange400 : "#353535"};
  font-weight: ${({ $isActivated }) => ($isActivated ? 700 : 500)};

  background-color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange200 : "transparent"};
  &:hover {
    background-color: ${({ theme }) => theme.color.orange200};
  }
  & * {
    stroke: ${({ $isActivated, theme }) =>
      $isActivated ? theme.color.orange400 : "#353535"};
  }
`;

export const SideTabButton = styled.div<{ $isActivated?: boolean }>`
  ${SideTabSVG}
`;

export const SideTabLink = styled(Link)<{ $isActivated?: boolean }>`
  ${SideTabSVG}
`;

export const SideTabContainer = styled.nav`
  ${FlexColumnCenter}
  width: 78px;
  padding: 14px 17px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.orange75};
  border-right: 1px solid ${({ theme }) => theme.color.orange200};
  gap: 10px;
  flex-shrink: 0;
  flex-grow: 0;

  ${media.tablet} {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
    height: fit-content;
    padding: 5px 15px 5px 10px;

    border-right: none;
    gap: 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.orange200};

    & > ${LogoLink} {
      display: block;
      width: 35px;
      height: 35px;
      padding: 5px;
      margin: 0;
    }
    & > ${SideTabButton}, & > ${SideTabLink} {
      font-size: 14px;
      font-style: normal;
      color: ${({ theme }) => theme.color.gray400};
      background-color: transparent;

      margin-bottom: 0;
      margin-right: 4px;

      width: fit-content;
      word-break: keep-all;
      text-align: center;

      padding: 5px;
      border-radius: 9999px;

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
    & > ${FooterContainer} {
      display: none;
    }
  }
`;
