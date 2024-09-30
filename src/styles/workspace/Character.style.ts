'use client';
import { styled } from 'styled-components';
import { clickable, FlexRowCenter, FlexRowLeftStart } from '..';

export const TabContainer = styled.div`
  ${FlexRowLeftStart};
  margin-top: 45px;
  width: 100%;
  border-bottom: 1px solid #CACDDA;
  height: 29px;
  gap: 48px;
  padding-left: 18px;
`;

export const TabButton = styled.div<{ $isSelected: boolean }>`
  ${FlexRowCenter};
  align-items: flex-start;
  ${clickable};
  font-weight: 400;
  color: ${({ $isSelected, theme }) => ($isSelected ? theme.color.orange400 : theme.color.gray300)};
  font-size: 18px;
  height: 100%;
  position: relative;
  ${({ $isSelected, theme }) => $isSelected && `
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -2px;
      width: 100%;
      height: 4px;
      border-radius: 10px;
      background-color: ${theme.color.orange400};
    }
  `}
`;
