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

export const MainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  calc(100% - 72px);
  overflow-y: auto;
  padding: 28px;
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  font-size: 28px;
  line-height: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};
`;
