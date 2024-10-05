'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexColumnLeftStart, FlexRowCenter, FlexRowLeftStart } from '..';

export const TabContainer = styled.div`
  ${FlexRowLeftStart};
  margin-top: 45px;
  width: 100%;
  border-bottom: 1px solid #CACDDA;
  height: 29px;
  gap: 48px;
  padding-left: 18px;
  flex-shrink: 0;
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

export const ContentsContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  flex-grow: 1;
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
  font-size: 14px;
  line-height: 21px;
`;

export const KeywordListContainerForCharacterCard = styled(KeywordListContainer)`
  margin-top: 0;
  font-size: 12px;
  line-height: 18px;
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
  border: 1px solid ${({ theme, $darkColor}) => $darkColor ?? theme.color.gray400};
`;


export const CharacterListContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  margin-top: 36px;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-start;
`;
export const CharacterCard = styled.div`
  ${FlexColumnLeftStart};
  ${clickable};
  width: 244px;
  padding: 20px;
  border-radius: 12px;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 12px #00000033;
`;
export const CharacterCardTitle = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  &>*:last-child {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
export const CharacterImage = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  box-shadow: 2px 2px 8px #323F4D33;
  border: 2px solid #fff;
  flex-shrink: 0;
  margin-right: 12px;
`;
export const CharacterName = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 123px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CharacterRole = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 123px;
`;
export const CharacterDescription = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CreateCharacterButton = styled.button`
  ${FlexRowCenter};
  ${clickable};
  padding: 12px 28px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.color.orange500};
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  margin-top: auto;
  border: none;
  &:disabled {
    background-color: ${({ theme }) => theme.color.gray200};
    color: ${({ theme }) => theme.color.gray400};
  }
`;
