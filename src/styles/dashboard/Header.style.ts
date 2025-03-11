"use client";
import { media } from "@/styles/media";
import { styled } from "styled-components";
import { FlexRowSpaceBetween } from "@/styles";
import {
  GrayTextButton,
  HamburgerMenuButton,
  Round12GradientBackgroundBlackIcon,
  Round9999GradientBackgroundBlackIcon,
  Round9999OrangeBackgoundWhiteColor,
  Round9999RedBackgoundWhiteColor,
} from "@/styles/Button";
import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import { FontTabletSemibold14 } from "../Font";

export const HeaderContainer = styled.div`
  ${FlexRowSpaceBetween}
  width: 100%;
  padding: 0 20px;
  margin-top: calc(31px - 20px);
  margin-bottom: 60px;

  ${media.tablet} {
    margin-top: 0;
    display: none;
    flex-direction: column;
    width: 100%;
    background: none;
    box-shadow: none;
    gap: 0;
    outline: none;
    svg {
      display: none;
    }
    & > p {
      color: ${({ theme }) => theme.color.gray400};
    }
  }
`;

export const HeaderRightButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  gap: 12px;

  ${media.tablet} {
    display: flex;
    flex-direction: column;
    background: none;
    box-shadow: none;
    gap: 0;
  }
`;

export const TabletHeaderMenuContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;

  height: fit-content;
  width: 100%;
  padding: 0 15px;
  gap: 15px;

  ${media.tablet} {
    display: flex;

    ${HeaderContainer} {
      display: flex;
      flex-direction: column;
      padding: 0;
      margin-bottom: 0;
    }
  }
`;

export const HeaderLeftButton = styled.button`
  margin-right: 12px;
  ${Round9999RedBackgoundWhiteColor}
  ${media.tablet} {
    ${GrayTextButton}
  }
`;

export const PopupButton = styled.button`
  ${Round9999OrangeBackgoundWhiteColor}
  ${FontTabletSemibold14}
  padding: 12px;
  ${media.tablet} {
    ${GrayTextButton}
  }
`;

export const HeaderRightButton = styled.button`
  ${Round9999GradientBackgroundBlackIcon}
  ${media.tablet} {
    ${GrayTextButton}
  }
`;

export const HearderProfileButton = styled.button`
  ${Round12GradientBackgroundBlackIcon}
  ${media.tablet} {
    ${GrayTextButton}
  }
`;

export const TabletHeaderButton = styled(HamburgerMenu)`
  display: none;
  ${media.tablet} {
    ${HamburgerMenuButton}
  }
`;
