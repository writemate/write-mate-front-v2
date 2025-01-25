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
import { Title } from ".";
import {
  FontBold20,
  FontBold24,
  FontBold28,
  FontRegular13,
  FontRegular14,
  FontRegular16,
  FontSemibold14,
  FontSemibold16,
  FontTabletRegular13,
  FontTabletRegular14,
} from "../Font";
import {
  GrayTextButton,
  Round9999EmptyBackgoundOrangeColor,
  Round9999OrangeBackgoundWhiteColor,
} from "../Button";
import { LoadingMessage } from "../dashboard/Loading.style";

// 네비게이션 바
export const TabContainer = styled.div`
  ${FlexRowLeftStart};
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
  ${FlexRowCenter}
  ${FontRegular16}
  align-items: flex-start;
  ${clickable};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.color.orange400 : theme.color.gray300};
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
  margin-bottom: 20px;
`;

export const SubTitle = styled.span`
  ${FontBold20}
  color: ${({ theme }) => theme.color.gray400};
`;

export const OpenManagement = styled.span`
  ${clickable};
  ${FontSemibold14}
  color: ${({ theme }) => theme.color.gray300};
  margin-left: auto;
`;

export const KeywordListContainer = styled.div`
  ${FlexRowLeftStart};
  ${FontSemibold14}
  position: relative;
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  height: fit-content;
  align-items: center;

  ${media.tablet} {
    margin-top: 16px;
    gap: 6px;
    align-items: center;
  }
`;

export const KeywordAddDiv = styled.div`
  ${FlexRowCenter}
  width: 24px;
  height: auto;
  position: relative;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.color.gray400};
  }
`;

export const KeywordListContainerForCharacterCard = styled(
  KeywordListContainer
)`
  ${FontTabletRegular13}
  margin-top: 0;
  height: fit-content;
  flex-wrap: wrap;
  overflow: auto;
  align-items: baseline;
  align-content: flex-start;
`;

export const KeywordContainer = styled.div<{
  $lightColor?: string;
  $darkColor?: string;
}>`
  ${FlexRowCenter};
  ${clickable};
  ${FontTabletRegular13}
  gap: 6px;
  padding: 4px 10px;
  border-radius: 30px;
  background-color: ${({ $lightColor = "transparent" }) => $lightColor};
  color: ${({ theme, $darkColor }) => $darkColor ?? theme.color.gray400};
  border: 1px solid
    ${({ theme, $darkColor }) => $darkColor ?? theme.color.gray400};

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

// 캐릭터 리스트
export const CharacterListContainer = styled.div<{ $forInfoPage: boolean }>`
  position: relative;
  ${FlexRowLeftStart};
  width: 100%;
  height: ${({ $forInfoPage }) => ($forInfoPage ? "auto" : "100%")};
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

  ${media.tablet} {
    padding: 0 16px;
  }
`;

export const CharacterCardContainer = styled(Link)`
  position: relative;
  ${FlexColumnLeftStart};
  ${clickable};
  align-items: flex-start;
  width: 244px;
  height: 220px;
  padding: 18px;
  border-radius: 12px;
  gap: 10px;
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 12px #00000033;

  ${KeywordContainer} {
    padding: 2px 10px;
  }

  ${media.tablet} {
    padding: 16px;
    gap: 8px;
    width: 100%;
    height: fit-content;
  }
`;
export const CharacterCardTitle = styled.div`
  position: relative;
  ${FlexRowLeftStart};
  width: 100%;
  & > *:last-child {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
export const CharacterImage = styled.div<{ $src: string }>`
  ${FontBold20}
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
`;
export const CharacterName = styled.div<{ $isNew?: boolean }>`
  ${FontSemibold14}
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $isNew }) =>
    $isNew ? theme.color.gray300 : theme.color.gray900};
`;
export const CharacterRole = styled.div`
  ${FontTabletRegular13}
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 123px;
`;
export const CharacterDescription = styled.div<{ $isNew?: boolean }>`
  ${FontTabletRegular14}
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
  ${Round9999OrangeBackgoundWhiteColor}
`;

export const CharacterRelationContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
  overflow: hidden;
  position: relative;

  ${LoadingMessage} {
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
  top: calc(100% + 8px);
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
    ${FontTabletRegular13}
    position: absolute;
    right: 5px;
    padding: 10px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.gray75};
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

  svg {
    width: 28px;
    height: 28px;

    ${media.tablet} {
      width: 24px;
      height: 24px;
    }
  }

  ${media.tablet} {
    padding: 20px 16px;
  }
`;
export const CharacteristicTitle = styled.input`
  ${FontBold20}
  flex-grow: 1;
  flex-shrink: 1;
  border: none;
  outline: none;
  width: 100%;
`;
export const CharacteristicContent = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  ${FontRegular16}
`;

export const CharacteristicAdd = styled.button`
  ${GrayTextButton}
  ${FontRegular14}
  margin-top: 12px;
  &:hover {
    underline: none;
    color: ${({ theme }) => theme.color.orange400};
  }
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
  ${FontBold28}
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
  ${FontSemibold16}
  color: ${({ theme }) => theme.color.red400};
`;

export const RelationCharacterDescription = styled.div`
  ${FontTabletRegular13}
  width: 150px;
  padding: 4px;
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
      ${FontTabletRegular14}
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
  ${FlexColumnLeftStart};
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);

  & > ${Title} {
    margin-bottom: 20px;
  }
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
  ${FontTabletRegular13}
  gap: 10px;
  flex-shrink: 0;
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
  ${FontTabletRegular13}
  gap: 11px;
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
  ${FontSemibold16}
  ${clickable};
  width: 302px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.orange400};
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
  position: relative;
  ${Round9999OrangeBackgoundWhiteColor}
`;
