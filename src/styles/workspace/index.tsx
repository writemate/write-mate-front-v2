'use client';
import { FlexColumnCenter, FlexRowLeftStart } from '@/styles';
import { styled } from 'styled-components';

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

export const SidebarContainer = styled.div`
  ${FlexColumnCenter}
  width: 258px;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 20px 6px 18px;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-grow: 0;
  box-shadow: 4px 0 8px 0 rgba(30, 33, 43, 0.1);
`;

export const MainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  calc(100% - 72px);
  overflow-y: auto;
  padding: 28px;
`;
