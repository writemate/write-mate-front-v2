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
  ${FlexRowLeftStart};
  width: 100%;
  height: calc(100% - 72px);
`;

export const MainContainer = styled.div<{ $isLeftOpen: boolean; $isRightOpen: boolean }>`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  //최대 너비가 1012px이면서 최소 패딩이 28px이도록
  //left open일때는 왼쪽에서 258px 빼고, right open일때는 오른쪽에서 309px 빼고
  padding-top: 65px;
  padding-left: max(28px, ${({ $isLeftOpen }) => ($isLeftOpen ? `calc((100% - 1012px) / 2 - 258px)` : 'calc((100% - 1012px) / 2)')});
  padding-right: max(28px, ${({ $isRightOpen }) => ($isRightOpen ? `calc((100% - 1012px) / 2 - 309px)` : 'calc((100% - 1012px) / 2)')});
  padding-bottom: 60px;
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
