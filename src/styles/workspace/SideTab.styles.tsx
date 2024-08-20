'use client';
import { styled,css } from 'styled-components';
import { clickable } from '@/styles';
import Link from 'next/link';

export const SideTabContainer = styled.div`
  width: 78px;
  padding: 14px 17px;
  height: 100%;
  background-color: var(--background-50);
  border-right: 1px solid var(--background-200);
`;

const SideTabSVG = css<{ $active?: boolean }>`
  ${clickable}
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 0 auto 10px;
  background-color: ${({ $active }) => $active ? 'var(--background-200)' : 'transparent'};
  & *{
    stroke: ${({ $active }) => $active ? 'var(--background-500)' : '#353535'};
  }
`;

export const SideTabButton = styled.div<{ $active?: boolean }>`
  ${SideTabSVG}
`;

export const SideTabLink = styled(Link)<{ $active?: boolean }>`
  ${SideTabSVG}
`;
