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
  height: 100%;
`;

export const SidebarContainer = styled.div`
  width: 258px;
  height: 100%;
  background-color: #ffffff;
`;
