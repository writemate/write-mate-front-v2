"use client";
import { media } from "@/styles/media";
import { clickable, FlexColumnCenter } from "@/styles";
import Link from "next/link";
import { styled } from "styled-components";

export const TitleAndWorkListContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;

  ${media.tablet} {
    padding-top: 16px;
  }
`;

export const WorkListContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  height: 100%;
  align-items: start;
  justify-content: start;
  justify-items: center;
  gap: 16px;
  padding: 20px;
  width: 100%;
  overflow-y: auto;

  ${media.tablet} {
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`;

export const EmptyListDiscription = styled.div`
  ${FlexColumnCenter}
  ${FontRegular16}
  color: ${({ theme }) => theme.color.gray300};
  width: 100%;
  height: 100%;
  justify-content: center;
  text-align: center;
`;

export const WorkLinkCardContainer = styled(Link)`
  -webkit-user-drag: none;
  width: 100%;
  border: none;
  display: flex;
  padding: 8px 8px 12px 8px;
  flex-direction: column;
  flex-shrink: 0;

  border-radius: 12px;
  background: var(--white, #fff);
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;

export const WorkButtonCardContainer = styled.div`
  width: 100%;
  border: none;
  display: flex;
  padding: 8px 8px 12px 8px;
  flex-direction: column;
  flex-shrink: 0;

  border-radius: 12px;
  background: var(--white, #fff);
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);

  ${clickable}
`;

export const WorkButtonImage = styled.div<{
  $url: string;
}>`
  width: 100%;
  padding-top: 133%;
  flex-shrink: 0;
  margin-bottom: 12px;

  border-radius: 20px;
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: 50% 50%;
`;

export const TitleAndDateAndKebab = styled.div`
  position: relative;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
  gap: 8px;
}
`;

export const TitleAndDate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const WorkButtonTitle = styled.div`
  width: 100%;

  overflow: hidden;
  margin-bottom: 4px;

  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;


  input {
    width: 100%;

    border: 1px solid ${({ theme }) => theme.color.white};;
    outline: none;
    border-radius: 3px;

    font-size: 14px;
    font-style: normal;
    font-weight: 600;

    &:focus { 
      border: 1px solid ${({ theme }) => theme.color.orange400};
  }

`;

export const WorkButtonDate = styled.div`
  color: #303030;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 10px */

  ${media.tablet} {
    font-size: 8px;
  }
`;

import KebabIcon from "@/assets/icons/KebabMenu.svg";
import { FontRegular16 } from "@/styles/Font";
import { IconCanActiveNOpenButton } from "@/styles/Button";
export const KebabButton = styled(KebabIcon)<{
  $isOpen: boolean;
  $isActivated?: boolean;
}>`
  ${IconCanActiveNOpenButton}
`;

export const ChangeCoverInput = styled.input`
  display: none;
`;
