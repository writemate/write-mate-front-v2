'use client';
import { styled } from 'styled-components';
import { clickable } from '@/styles';
import { GtagForClick } from '@/utils/GtagForClick';

export const HeaderContainer = styled.header`
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
  margin-left: auto;
  transition: font-weight 0.15s cubic-bezier(.4,0,.2,1);
  font-size: 1rem;
  font-weight: 400;
  background: none;
  border: none;
  &:hover {
    font-weight: 700;
  }
  &::after {
    content: attr(title);
    display: block;
    font-wight: 700;
    height: 0;
    visibility: hidden;
  }
`;

export const StartButton = styled(GtagForClick)`
  ${clickable};
  padding: 10px;
  text-align: center;
  margin-left: 20px;
  transition: all 0.15s cubic-bezier(.4,0,.2,1);
  font-size: 1rem;
  border-radius: 5px;
  font-weight: 600;
  background-color: #191919;
  color: white;
  border: none;
  &:hover {
    background-color: #333;
  }
`;
