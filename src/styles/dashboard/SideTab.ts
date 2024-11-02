"use client";
import { clickable } from "@/styles";
import { styled, css } from "styled-components";
import Link from "next/link";

export const SideTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 228px;
  background-color: #ffffff;
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
  ${clickable}
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  & * {
    stroke: ${({ $isActivated, theme }) =>
      $isActivated ? theme.color.orange400 : theme.color.gray400};
  }
  &:hover {
    transform: scale(1.05); /* 살짝 확대 효과 */
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
  background: var(--writemate-orange-400, #f49661);
  border: none;

  /* Menu button 1 */
  box-shadow: 0px 0px 8px 0px rgba(255, 84, 0, 0.2);

  color: var(--white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 16px */
  letter-spacing: 0.32px;
`;
