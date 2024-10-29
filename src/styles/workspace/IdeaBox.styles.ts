'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexRowCenter, FlexRowSpaceBetween } from '@/styles';
import Close from '@/assets/icons/close.svg';

export const IdeaBoxContainer = styled.div`
  ${FlexColumnCenter}
  width: 309px;
  height: 100%;
  border-left: 1px solid #D7DCE7;
  background-color: #ffffff;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const IdeaBoxHeader = styled.div`
  ${FlexRowSpaceBetween}
  width: 100%;
  height: 64px;
  padding: 20px;
  border-bottom: 1px solid #EDF2FC;
`;

export const IdeaBoxTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;

export const IdeaBoxCloseButton = styled(Close)`
  ${clickable}
`;

export const SelectIdeaTypeContainer = styled.div`
  ${FlexRowCenter}
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #EDF2FC;
`;

export const SelectIdeaTypeButton = styled.div<{ $isSelected: boolean }>`
  ${clickable}
  ${FlexRowCenter}
  width: 100%;
  height: 100%;
  font-size: 14px;
  position: relative;
  ${({ $isSelected }) => $isSelected && `
    font-weight: 600;
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 2px;
      background-color: #000000;
    }
  `}
`;

export const IdeaBoxContent = styled.div`
  ${FlexColumnCenter}
  width: 100%;
  height: calc(100% - 99px);
  padding: 20px;
  background-color: rgba(241, 245, 251, 0.43);
  overflow-y: auto;
  overflow-x: hidden;
`;


export const MemoCard = styled.div`

`;

export const MemoContent = styled.div`

`;

export const MemoTitle = styled.div`

`;

export const CopyButton = styled.div`

`;
