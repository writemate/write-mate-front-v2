'use client';
import { styled } from 'styled-components';
import { clickable, FlexColumnCenter, FlexColumnLeftStart, FlexRowCenter, FlexRowLeftStart, FlexRowSpaceBetween } from '@/styles';

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

export const CoverImage = styled.img`
  width: 254px;
  height: 341px;
  object-fit: cover;
  border-radius: 4.72px;
`;

export const Container = styled.div`
  ${FlexColumnLeftStart}
  gap: 20px;
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
