"use client";
import { styled } from "styled-components";
import { DropdownMenuWrapper, DropdownSelector } from "@/styles";
import {
  Button,
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
} from "..";
import Link from "next/link";
import { media } from "../media";

// 네비게이션 바
export const TabContainer = styled.div`
  ${FlexRowLeftStart};
  margin-top: 45px;
  width: 100%;
  border-bottom: 1px solid #cacdda;
  height: 29px;
  gap: 48px;
  padding-left: 18px;
  flex-shrink: 0;

  ${media.tablet} {
    margin-top: 24px;
    padding-left: 9px;
    gap: 24px;
  }
`;

export const TabButton = styled.div<{ $isSelected: boolean }>`
  ${FlexRowCenter};
  align-items: flex-start;
  ${clickable};
  font-weight: 400;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.orange400 : theme.color.gray300};
  font-size: 18px;
  height: 100%;
  position: relative;
  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
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

  ${media.tablet} {
    font-size: 14px;
  }
`;

// 메인
export const ContentsContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  flex-grow: 1;
  margin-top: 36px;

  ${media.tablet} {
    margin-top: 24px;
  }
`;

// 키워드
export const KeywordTitle = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
`;

export const SubTitle = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray400};

  ${media.tablet} {
    font-size: 14px;
  }
`;

export const OpenManagement = styled.span`
  ${clickable};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray300};
  margin-left: auto;

  ${media.tablet} {
    font-size: 12px;
  }
`;

export const KeywordListContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  margin-top: 20px;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 21px;
  height: fit-content;

  svg {
    width: 33px;
    height: 100%;
  }

  & > div {
    align-items: center;
    align-self: center;
    justify-content: center;
  }

  ${media.tablet} {
    margin-top: 16px;
    gap: 6px;
    font-size: 12px;
    align-items: center;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const KeywordListContainerForCharacterCard = styled(
  KeywordListContainer
)`
  margin-top: 0;
  font-size: 12px;
  line-height: 18px;
  height: 78px;
  overflow: hidden;
  align-items: flex-end;

  ${media.tablet} {
    height: 100px;
  }
`;

export const KeywordContainer = styled.div<{
  $lightColor?: string;
  $darkColor?: string;
}>`
  ${FlexRowCenter};
  ${clickable};
  gap: 6px;
  padding: 6px 10px;
  border-radius: 30px;
  background-color: ${({ $lightColor = "transparent" }) => $lightColor};
  color: ${({ theme, $darkColor }) => $darkColor ?? theme.color.gray400};
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  border: 1px solid
    ${({ theme, $darkColor }) => $darkColor ?? theme.color.gray400};

  & > svg {
    width: 20px;
    height: 20px;
  }

  ${media.tablet} {
    font-size: 12px;
  }
`;

// 캐릭터 리스트
export const CharacterListContainer = styled.div<{ $forInfoPage: boolean }>`
  position: relative;
  ${FlexRowLeftStart};
  width: 100%;
  margin-top: ${({ $forInfoPage }) => ($forInfoPage ? "0" : "36px")};
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-start;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
  }
`;

export const CharacterCardContainer = styled(Link)`
  ${FlexColumnLeftStart};
  ${clickable};
  width: 244px;
  height: 228px;
  padding: 20px;
  border-radius: 12px;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 12px #00000033;

  ${media.tablet} {
    width: 100%;
    padding: 16px;
  }
`;
export const CharacterCardTitle = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  & > *:last-child {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
export const CharacterImage = styled.div<{ $src: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  box-shadow: 2px 2px 8px #323f4d33;
  border: 2px solid #fff;
  flex-shrink: 0;
  margin-right: 12px;
  font-size: 18px;
  font-weight: 700;
`;
export const CharacterName = styled.div<{ $isNew?: boolean }>`
  font-size: 14px;
  font-weight: 700;
  width: 123px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $isNew }) =>
    $isNew ? theme.color.gray300 : theme.color.gray900};
`;
export const CharacterRole = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 123px;
`;
export const CharacterDescription = styled.div<{ $isNew?: boolean }>`
  font-size: 14px;
  line-height: 21px;
  height: 42px;
  color: ${({ theme, $isNew }) =>
    $isNew ? theme.color.gray200 : theme.color.gray400};
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

export const MiniModal = styled.div<{ $left: number }>`
  ${FlexColumnLeftStart};
  position: absolute;
  top: 20px;
  left: ${({ $left }) => $left}px;
  width: 320px;
  border-radius: 8px;
  background-color: #fff;
  z-index: 100;
  padding: 9px;
  box-shadow: 0px 0px 12px #00000033;
  gap: 8px;
`;

export const InputWithButton = styled.div`
  ${FlexRowCenter};
  width: 100%;
  position: relative;
  & > input {
    padding-right: 43px;
    width: 302px;
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.color.gray75};
  }
  & > button {
    ${clickable};
    position: absolute;
    right: 5px;
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
  ${FlexColumnCenter};
  width: 100%;
  gap: 12px;
`;

export const CharacteristicContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  padding: 26px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  gap: 6px;
`;
export const CharacteristicTitle = styled.input`
  flex-grow: 1;
  flex-shrink: 1;
  border: none;
  outline: none;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  width: 100%;
`;
export const CharacteristicContent = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

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
`;

export const EditRelationContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  gap: 16px;
  & > hr {
    width: 100%;
    background: #bbb;
    height: 1px;
    border: none;
    flex-shrink: 0;
  }
`;

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

export const RelationCharacterContainer = styled.div`
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
`;
export const RelationCharacterName = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  color: ${({ theme }) => theme.color.red400};
`;

export const RelationCharacterDescription = styled.div`
  width: 150px;
  padding: 4px;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  height: calc(13px * 1.4 * 5);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.color.gray400};
`;

export const RelationArrowContainer = styled.div`
  ${FlexColumnCenter};
  gap: 29px;
  flex-grow: 1;
  width: 100%;
  & > div {
    ${FlexRowCenter};
    width: 100%;
    & > *:not(input) {
      flex-shrink: 0;
    }
    & > input {
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
      background-color: #fff;
      flex-grow: 1;
    }
  }
`;

export const RelationFooter = styled.div`
  ${FlexRowCenter};
  width: 100%;
  gap: 12px;
`;

export const CancelButton = styled(Button).attrs((props) => ({
  $border: true,
}))`
  margin-left: auto;
`;

export const SaveButton = styled(
  styled(Button)<{ $isSavalble: boolean }>``
).attrs((props) => ({
  $background: props.$isSavalble ? props.theme.color.gray900 : "#CDCDCD",
  $color: "#fff",
}))``;

export const ManageKeywordContainer = styled.div`
  ${FlexColumnCenter};
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
`;

export const ManageRowWrapper = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  height: 100%;
  gap: 20px;
  align-items: stretch;
`;

export const ManageKeywordLeft = styled.div`
  ${FlexColumnLeftStart};
  gap: 10px;
  flex-shrink: 0;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.color.gray900};
`;

export const VerticalLine = styled.div`
  width: 1px;
  height: 228px;
  background-color: ${({ theme }) => theme.color.gray200};
  flex-shrink: 0;
`;

export const ManageKeywordRight = styled.div`
  ${FlexColumnLeftStart};
  gap: 11px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  color: ${({ theme }) => theme.color.gray900};
`;

export const SelectColorContainer = styled.div`
  ${FlexRowLeftStart};
  gap: 6px;
  & > div {
    ${clickable};
    width: 24px;
    height: 24px;
    border-radius: 100%;
  }
`;

export const SelectableColor = styled.div<{
  $color: string;
  $isSelected?: boolean;
}>`
  background-color: ${({ theme, $color, $isSelected }) =>
    $isSelected
      ? theme.color[$color + ($color === "darkYellow" ? "600" : "500")]
      : theme.color[$color + "200"]};
  border: 1px solid
    ${({ theme, $color }) =>
      theme.color[$color + ($color === "darkYellow" ? "600" : "500")]};
`;

export const RandomColor = styled.div<{ $isSelected?: boolean }>`
  background: conic-gradient(red, yellow, #1e90ff, red);
  opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.6)};
  border: 1px solid ${({ theme }) => theme.color.gray900};
`;

export const CreateKeywordButton = styled.button`
  ${FlexRowCenter};
  ${clickable};
  width: 302px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.orange400};
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  margin-top: auto;
  border: none;
  color: #fff;
  &:disabled {
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;

export const CharacterDropdownMenuWrapper = styled(DropdownMenuWrapper)`
  width: 100%;
  max-width: 150px;
  position: relative;
`;

export const CharacterDropdownSelector = styled(DropdownSelector)`
  box-shadow: none;
  color: ${({ theme }) => theme.color.red400};
  & > svg {
    flex-shrink: 0;
  }
  & path {
    fill: ${({ theme }) => theme.color.red400};
  }
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const AddMemoButtonContainer = styled(Link)`
  ${clickable}
  position:relative;

  width: fit-content;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.orange400};
  border: none;

  color: ${({ theme }) => theme.color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  letter-spacing: 0.32px;

  &:hover {
    filter: brightness(95%);
  }

  ${media.tablet} {
    scale: 0.75;
    bottom: 10px;
  }
`;

export const LoadingMessage = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;

  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray300};

  ${media.tablet} {
    font-size: 14px;
  }
`;
