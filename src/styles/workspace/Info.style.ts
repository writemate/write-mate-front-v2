'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexColumnLeftStart, FlexRowCenter, FlexRowLeftStart, FlexRowSpaceBetween } from '@/styles';

export const Infos = styled.div`
  ${FlexColumnCenter}
  gap: 60px;
  width: 100%;
  margin-top: 100px;
`;

export const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 20px;
`;

export const CoverContainer = styled.div`
  ${FlexRowLeftStart}
  align-items: flex-end;
  gap: 36px;
  width: 100%;
  margin-top: 55px;
`;

export const BlurBackground = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
`;
export const ChangeCover = styled.div``;

export const CoverImageContainer = styled.div`
  ${FlexRowCenter}
  flex-shrink: 0;
  width: 263px;
  height: 341px;
  border-radius: 4.72px;
  padding: 55px 44px;
  position: relative;
  overflow: hidden;
  ${BlurBackground} {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4.72px;
    z-index: 0;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(10px);
  }
  ${ChangeCover} {
    ${FlexRowCenter};
    display: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background-color: #88888857;
    color: #FFFFFF;
    backdrop-filter: blur(10px);
  }
  &:hover {
    ${ChangeCover} {
      display: flex;
    }
  }
`;

export const CoverImage = styled.img<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #FFFFFF57;
  z-index: 1;
`;

export const Container = styled.div`
  ${FlexColumnLeftStart}
  width: 100%;
`;

export const TextWithDropMenu = styled.div`
  ${FlexRowLeftStart};
  gap: 10px;
  width: 100%;
`;

export const DropdownMenu = styled.div`
  ${clickable};
  ${FlexRowCenter};
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.gray200};
  color: ${({ theme }) => theme.color.gray900};
`;
