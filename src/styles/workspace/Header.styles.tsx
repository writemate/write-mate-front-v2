'use client';
import { styled } from 'styled-components';
import { clickable } from '..';
import { GtagForClick } from '@/utils/GtagForClick';

export const HeaderContainer = styled.header`
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  height: 80px;
`;
