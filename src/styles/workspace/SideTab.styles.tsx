'use client';
import { styled,css } from 'styled-components';
import { clickable, FlexColumnCenter } from '@/styles';
import Link from 'next/link';

export const SideTabContainer = styled.nav`
  ${FlexColumnCenter}
  width: 78px;
  padding: 14px 17px;
  height: 100%;
  background-color: var(--background-50);
  border-right: 1px solid var(--background-200);
  gap: 10px;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const LogoLink = styled(Link)`
  margin-bottom: 42px;
`;

const SideTabSVG = css<{ $inPage?: boolean, $isOpened?: boolean }>`
  ${clickable}
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ $inPage, $isOpened }) => $inPage||$isOpened ? 'var(--background-200)' : 'transparent'};
  & *{
    stroke: ${({ $isOpened }) => $isOpened ? 'var(--background-500)' : '#353535'};
  }
`;

export const SideTabButton = styled.div<{ $inPage?: boolean, $isOpened?: boolean }>`
  ${SideTabSVG}
`;

export const SideTabLink = styled(Link)<{ $inPage?: boolean, $isOpened?: boolean }>`
  ${SideTabSVG}
`;
