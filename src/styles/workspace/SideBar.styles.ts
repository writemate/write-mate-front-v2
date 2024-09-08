'use client';
import { css, styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexRowCenter, FlexRowLeftStart, FlexRowSpaceBetween } from '@/styles';
import KebabIcon from "@/assets/workspace/sideBar/kebab.svg";

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
  margin-bottom: 6px;
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
  width: 100%;
  overflow: auto;
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
  &>div:nth-child(1){
    margin-bottom: 6px;
  }
`

export const Kebab = styled(KebabIcon)`
  ${clickable}
  margin-left: auto;
  &>rect{
    display: none;
  }
  &:hover{
    &>rect{
      display: block;
    }
  }
`;

export const FileName = styled.div`
  font-weight: 400;
  margin-left: 6px;
  line-height: 24px;
`;

export const FileContainer = styled.div<{ $isFolder: boolean, $nestedLevel?:number, $isSelect?:boolean }>`
  ${FlexRowLeftStart};
  ${clickable};
  align-items: flex-start;
  width: 100%;
  padding: 6px 10px 6px 0px;
  padding-left: ${({ $isFolder, $nestedLevel = 0 }) => {
    if($isFolder) return `${$nestedLevel * 12}px`;
    return `${$nestedLevel * 12 + 16}px`;
  }};
  border-radius: 6px;
  background-color: ${({ $isSelect,theme }) => $isSelect ? theme.color.orange100 : 'transparent'};
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
`;
