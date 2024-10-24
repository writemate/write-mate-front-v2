"use client";
import { FlexRowLeftStart, clickable, FlexColumnCenter } from "@/styles";
import { styled, css } from "styled-components";

export const DashboardContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-start;
  padding: 28px;
  width: 100%;
  height: 100%;
  background-color: #fdefe7;
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

export const HeaderContainer = styled.div`
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
