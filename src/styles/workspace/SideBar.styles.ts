'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexRowCenter, FlexRowLeftStart, FlexRowSpaceBetween } from '@/styles';
import KebabIcon from "@/assets/workspace/sideBar/kebab.svg";
import Link from 'next/link';

export const SidebarContainer = styled.div`
  ${FlexColumnCenter}
  width: 258px;
  height: 100%;
  border-radius: 0 8px 8px 0;
  padding: 20px 12px 18px;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-grow: 0;
  box-shadow: 4px 0 8px 0 rgba(30, 33, 43, 0.1);
`;

export const SidebarTitleContainer = styled.div`
  ${FlexRowSpaceBetween};
  width: 100%;
  padding: 12px 5px 12px 16px;
`;

export const SidebarTitle = styled.div`
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  color: #000000;
`;

export const SidebarIconContainer = styled.div`
  ${FlexRowCenter};
  &>*{
    ${clickable}
    &>rect:nth-child(1){
      display: none;
    }
    &:hover{
      &>rect:nth-child(1){
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
`;


export const FileListContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  gap: 6px;
`;

export const FolderContainer = styled.div`
  width: 100%;
  position: relative;
  &>div:nth-child(1){
    margin-bottom: 6px;
  }
`

export const KebabWrapper = styled.div`
  margin-left: auto;
  position: relative;
`;

export const Kebab = styled(KebabIcon)`
  ${clickable}
  &>rect{
    display: none;
  }
  &:hover{
    &>rect{
      display: block;
    }
  }
`;

export const FolderName = styled.div`
  font-weight: 400;
  margin-left: 6px;
  line-height: 24px;
`;

export const FileName = styled(Link)`
  font-weight: 400;
  margin-left: 6px;
  line-height: 24px;
`;

export const DropLine = styled.div<{$nestedLevel?:number, $active?:boolean}>`
  position: absolute;
  left: 0;
  width: calc(100% - ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12}px`});
  height: 6px;
  background-color: ${({ theme }) => theme.color.orange200};
  opacity: ${({ $active }) => $active ? 1 : 0};
  margin-left: ${({ $nestedLevel = 0 }) => `${$nestedLevel * 12}px`};
  z-index: 1;
`;

export const TopDropLine = styled(DropLine)`
  top: -6px;
`;

export const BottomDropLine = styled(DropLine)`
  bottom: -6px;
`;

export const FileContainer = styled.div<{ $isFolder: boolean, $nestedLevel?:number, $isSelect?:boolean, $dragOver?:boolean, $isEditing?:boolean }>`
  ${FlexRowLeftStart};
  ${clickable};
  align-items: flex-start;
  position: relative;
  width: 100%;
  padding: 6px 10px 6px 0px;
  padding-left: ${({ $isFolder, $nestedLevel = 0 }) => {
    if($isFolder) return `${$nestedLevel * 12}px`;
    return `${$nestedLevel * 12 + 16}px`;
  }};
  border-radius: 6px;
  ${({ $isSelect, $isEditing, theme }) => $isSelect && !$isEditing && `background-color: ${theme.color.orange100};`}
  ${({ $dragOver,theme }) => $dragOver && `background-color: ${theme.color.gray75};`}
  border: 1px solid ${({ $isEditing,theme }) => $isEditing ? theme.color.orange400 : "transparent"};
  color: ${({ $isSelect,theme }) => $isSelect ? theme.color.orange400 : "inherit"};
  ${Kebab}{
    opacity: 0;
    &>rect{
      fill: ${({ $isSelect, theme }) => $isSelect ? theme.color.orange300 : theme.color.gray100};
    }
  }
  &:hover{
    background-color: ${({ $isSelect, theme }) => $isSelect ? theme.color.orange200 : theme.color.gray75};
    ${Kebab}{
      opacity: 1;
    }
  }
  ${FileName}{
    color: ${({ $isSelect, theme }) => $isSelect ? theme.color.orange400 : "inherit"};
    font-weight: ${({ $isSelect }) => $isSelect ? 600 : 400};
  }
  & input{
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 24px;
    align-self: center;
    margin-left: 6px;
    font-weight: 400;
  }
`;

export const KebabContainer = styled.div`
  ${FlexColumnCenter};
  cursor: default;
  color: ${({ theme }) => theme.color.gray900};
  position: fixed;
  z-index: 1;
  padding: 6px 10px;
  gap: 2px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 #1E212B33;
  transform: translate(10px, -15px);
`;

export const KebabItem = styled.div`
  ${FlexRowCenter};
  ${clickable};
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid #F0F3F8;
  &:hover{
    background-color: #F2F4F9;
  }
`;
