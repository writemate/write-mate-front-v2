"use client";
import { FlexRowLeftStart, clickable, FlexColumnCenter } from "@/styles";
import { styled, css } from "styled-components";
import Link from "next/link";

export const DashboardContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-start;
  padding: 28px;
  width: 100%;
  height: 100%;
  background-color: #fdefe7;
`;

export const SideTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 228px;
  background-color: #ffffff;
  filter: drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.08));
  border-radius: 12px 0px 0px 12px;
  padding: 34px;
`;

export const LogoLink = styled(Link)`
  margin-bottom: 42px;
`;

export const SideTabMenu = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 300px;
`;

const SideTabSVG = css<{ $isActivated?: boolean }>`
  ${clickable}
  display: flex;
  width: fit-content;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  & * {
    stroke: ${({ $isActivated, theme }) =>
      $isActivated ? theme.color.orange400 : "#353535"};
  }
`;
export const SideTabLink = styled(Link)<{ $isActivated?: boolean }>`
  ${SideTabSVG}
  margin-left: 10px;
  margin-bottom: 20px;
`;

export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  background-color: #ffffff;
  filter: drop-shadow(-2px 2px 5px rgba(0, 0, 0, 0.08));
  border-radius: 0px 12px 12px 12px;
`;

export const SideBarAndMainContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  height: calc(100% - 72px);
`;

export const Header = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  height: 44px;
  padding: 17px 25px;
  px;
`;

export const MainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  padding: 37px;
  overflow-y: auto;
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  font-size: 28px;
  line-height: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};
`;
