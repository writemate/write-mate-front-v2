"use client";
import { css, styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import KebabIcon from "@/assets/workspace/sideBar/kebab.svg";
import Link from "next/link";
import { media } from "../media";

export const SidebarContainer = styled.div`
  ${FlexColumnCenter}
  width: 258px; //수정 시 workspace/index.ts의 MainContainer padding-left 수정 필요
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 20px 12px 18px;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-grow: 0;
  z-index: 500;
  box-shadow: 4px 0 8px 0 rgba(30, 33, 43, 0.1);

  ${media.tablet} {
    position: fixed;
    padding: 15px 9px 13px;
    font-size: 14px;

    top: 100px;
    left: 0;
    height: calc(100% - 100px);
  }
`;

export const SidebarTitleContainer = styled.div`
  ${FlexRowSpaceBetween};
  width: 100%;
  padding: 12px 5px 12px 16px;
  svg {
    width: 28px;
    height: 28px;
  }

  ${media.tablet} {
    padding: 9px 3px 9px 8px;
  }
`;

export const SidebarTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  color: #000000;

  ${media.tablet} {
    font-size: 16px;
    line-height: 16px;
  }
`;

export const SidebarIconContainer = styled.div`
  ${FlexRowCenter};
  & > * {
    ${clickable}
    &>rect:nth-child(1) {
      display: none;
    }
    &:hover {
      & > rect:nth-child(1) {
        display: block;
      }
    }
  }
`;

export const SidebarContentsContainer = styled.div`
  padding-top: 6px;
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ${media.tablet} {
    padding-top: 4px;
  }
`;

export const FileListContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  gap: 6px;
`;

export const FolderContainer = styled.div`
  position: relative;
  width: 100%;

  & > div:nth-child(1) {
  }
`;

export const KebabWrapper = styled.div`
  margin-left: auto;
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Kebab = styled(KebabIcon)`
  ${clickable}
  & > rect {
    display: none;
  }
  &:hover {
    & > rect {
      display: block;
    }
  }
`;

export const FolderName = styled.div`
  width: 100%;
  font-weight: 400;
  margin-left: 6px;
  line-height: 24px;
`;

export const FileName = FolderName;

export const DropLine = styled.div<{
  $nestedLevel?: number;
  $active?: boolean;
}>`
  position: absolute;
  left: 0;
  width: calc(100% - ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12}px`});
  height: 6px;
  background-color: ${({ theme }) => theme.color.orange200};
  display: ${({ $active }) => ($active ? "block" : "none")};
  margin-left: ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12}px`};
  z-index: 600;
`;

export const TopDropLine = styled(DropLine)`
  top: -6px;
`;

export const BottomDropLine = styled(DropLine)`
  bottom: -6px;
`;

const FileOrFolderContainer = css<{
  $nestedLevel?: number;
  $isSelect?: boolean;
  $dragOver?: boolean;
  $isEditing?: boolean;
}>`
  ${FlexRowCenter};
  ${clickable};
  position: relative;
  width: 100%;
  padding: 6px 10px 6px 0px;
  border-radius: 6px;
  ${({ $isSelect, $isEditing, theme }) =>
    $isSelect && !$isEditing && `background-color: ${theme.color.orange100};`}
  ${({ $dragOver, theme }) =>
    $dragOver && `background-color: ${theme.color.gray75};`}
  border: 1px solid ${({ $isEditing, theme }) =>
    $isEditing ? theme.color.orange400 : "transparent"};
  color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.color.orange400 : "inherit"};
  ${Kebab} {
    opacity: 0;
    & > rect {
      fill: ${({ $isSelect, theme }) =>
        $isSelect ? theme.color.orange300 : theme.color.gray100};
    }
  }
  &:hover {
    background-color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.color.orange200 : theme.color.gray75};
    ${Kebab} {
      opacity: 1;
    }
  }
  ${FileName} {
    color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.color.orange400 : "inherit"};
    font-weight: ${({ $isSelect }) => ($isSelect ? 600 : 400)};
  }
  & input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 24px;
    align-self: center;
    margin-left: 6px;
    font-weight: 400;
  }
  svg {
    flex-shrink: 0;
  }
`;

export const FolderFileContainer = styled.div<{
  $nestedLevel?: number;
  $isSelect?: boolean;
  $dragOver?: boolean;
  $isEditing?: boolean;
}>`
  ${FileOrFolderContainer};
  padding-left: ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12}px`};
`;

export const FileContainer = styled(Link)<{
  $nestedLevel?: number;
  $isSelect?: boolean;
  $dragOver?: boolean;
  $isEditing?: boolean;
}>`
  ${FileOrFolderContainer};
  padding-left: ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12 + 16}px`};
`;

export const KebabItem = styled.div`
  ${FlexRowCenter};
  ${clickable};
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid #f0f3f8;
  &:hover {
    background-color: #f2f4f9;
  }
`;

export const KebabContainer = styled.div`
  ${FlexColumnCenter};
  cursor: default;
  color: ${({ theme }) => theme.color.gray900};
  position: fixed;
  z-index: 1000;
  padding: 6px 10px;
  gap: 2px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 #1e212b33;
  transform: translate(10px, -15px);
  ${KebabItem}:last-child {
    border-bottom: none;
  }
`;
