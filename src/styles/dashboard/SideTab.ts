"use client";
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
  filter: drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.08));
  border-radius: 12px 0px 0px 12px;
  padding: 31px;
`;
export const SideTabMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 240px;
`;
export const LogoLink = styled(Link)`
  margin-bottom: 88px;
`;

const SideTabSVG = css<{ $isActivated?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  & * {
    color: ${({ $isActivated, theme }) =>
      $isActivated ? theme.color.orange400 : theme.color.gray400};
  }
  &:hover {
    transform: scale(1.05);
  }
  &:hover::after {
    ${HighlghtCssForHoberAfter}
    left: -3%;
    width: 103%;
    height: 100%;
  }
  color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange400 : theme.color.gray400};
  font-weight: ${({ $isActivated }) => ($isActivated ? "bold" : "normal")};
`;

export const SideTabLink = styled(Link)<{ $isActivated?: boolean }>`
  ${SideTabSVG}
  margin-bottom: 10px;
  padding: 5px;
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
    transform: scale(1.05);
    filter: brightness(105%);
  }
`;
