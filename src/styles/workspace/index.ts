"use client";
import { FlexColumnCenter, FlexRowLeftStart } from "@/styles";
import { styled } from "styled-components";

export const WorkspaceContainer = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  height: 100%;
  background-color: #f8f9fb;
`;

export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
`;

export const SideBarAndMainContainer = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  height: calc(100% - 72px);
`;

export const MainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  //최대 너비가 1012px이면서 최소 패딩이 28px이도록
  padding: 0 max(28px, calc((100% - 1012px) / 2));
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
