'use client';
import { styled } from 'styled-components';
import { Button, clickable, FlexColumnCenter, FlexColumnLeftStart, FlexRowCenter, FlexRowLeftStart } from '..';
import Link from 'next/link';

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
export const CharacterCard = styled(Link)`
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

export const CreateRelationButton = styled(CreateCharacterButton)`
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
`;

export const MiniModal = styled.div<{$left: number }>`
  ${FlexRowCenter};
  position: absolute;
  top: 20px;
  left: ${({ $left }) => $left}px;
  width: 320px;
  border-radius: 8px;
  background-color: #fff;
  z-index: 100;
  padding: 9px;
  box-shadow: 0px 0px 12px #00000033;
  &>input {
    padding-right: 43px;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.color.gray75};
  }
  &>button {
    ${clickable};
    position: absolute;
    right: 14px;
    padding: 10px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray75};
    font-size: 13px;
    font-weight: 400;
    width: 43px;
    border: none;
  }
`;

export const CharacteristicListContainer = styled.div`
  ${FlexColumnLeftStart};
  width: 100%;
  gap: 12px;
`;


export const CharacteristicContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  flex-wrap: wrap;
  padding: 26px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.10);
  gap: 6px;
`
export const CharacteristicTitle = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`
export const CharacteristicContent = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`

export const CharacteristicAdd = styled.button`
  ${clickable};
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 0 auto;
  background: none;
  border: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 350;
  line-height: 21px; /* 150% */
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.orange400};
`

export const EditRelationContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  height: 100%;
  background-color: #FFF;
  padding: 30px;
  border-radius: 12px;
  gap: 16px;
  &>hr{
    width: 100%;
    background: #BBB;
    height: 1px;
    border: none;
    flex-shrink: 0;
  }
`

export const RelationTitle = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 36px */
  margin-right: auto;
`;

export const RelationContentsContainer = styled.div`
  ${FlexRowCenter};
  width: 100%;
  gap: 40px;
  padding: 48px 0 26px;
  margin: 0 auto;
  max-width: 760px;
`;

export  const RelationCharacterContainer = styled.div`
  ${FlexColumnCenter};
  gap: 14px;
  flex-grow: 0;
`;

export const RelationCharacterImage = styled.div<{ $src?: string }>`
  width: 150px;
  height: 180px;
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(19, 19, 19, 0.12);
  background: url(${({ $src }) => $src}) lightgray 50% / cover no-repeat;
`
export const RelationCharacterName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  color: ${({ theme }) => theme.color.red400};
`

export const RelationCharacterDescription = styled.div`
  width: 150px;
  padding: 4px;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  color: ${({ theme }) => theme.color.gray400};
`;

export const RelationArrowContainer = styled.div`
  ${FlexColumnCenter};
  gap: 29px;
  flex-grow: 1;
  width: 100%;
  &>div{
    ${FlexRowCenter};
    width: 100%;
    &>*:not(input){
      flex-shrink: 0;
    }
    &>input{
      width: 100%;
      padding: 7px 15px;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      border: ${({ theme }) => theme.color.orange400} 1px solid;
      border-radius: 100px;
      outline: none;
      background-color: #FFF;
      flex-grow: 1;
    }
  }
`

export const RelationFooter = styled.div`
  ${FlexRowCenter};
  width: 100%;
  gap: 12px;
`

export const CancelButton = styled(Button).attrs(props=>({$border: true}))`
  margin-left: auto;
`;

export const SaveButton = styled(styled(Button)<{ $isSavalble: boolean }>``).attrs(props=>({
  $background: props.$isSavalble ? props.theme.color.gray900 : '#CDCDCD',
  $color: "#fff",
}))``;
