'use client';
import { styled } from 'styled-components';
import { clickable } from '.';

export const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  height: 80px;
`;

export const RightMenuButton = styled.button`
  ${clickable};
  padding: 10px;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  background: none;
  border: none;
  &:hover {
    font-weight: 700;
  }
`;
