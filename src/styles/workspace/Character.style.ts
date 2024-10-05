'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexRowCenter, FlexRowLeftStart } from '..';

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

export const CharacterListContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  margin-top: 36px;
`;

export const KeywordTitle = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
`;

export const SubTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray400};
`;

export const OpenManagement = styled.span`
  ${clickable};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray300};
  margin-left: auto;
`;

export const KeywordListContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  margin-top: 20px;
  gap: 8px;
  flex-wrap: wrap;
`;

export const KeywordContainer = styled.div<{ $lightColor?: string, $darkColor?: string }>`
  ${FlexRowCenter};
  ${clickable};
  gap: 6px;
  padding: 6px 10px;
  border-radius: 30px;
  background-color: ${({ $lightColor="transparent" }) => $lightColor};
  color: ${({ theme, $darkColor}) => $darkColor ?? theme.color.gray400};
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid ${({ theme, $darkColor}) => $darkColor ?? theme.color.gray400};
`;
