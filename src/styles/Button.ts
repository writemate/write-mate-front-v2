import styled, { css } from "styled-components";
import {
  clickable,
  FlexRowCenter,
  FlexRowLeftStart,
  MainColorBackground,
} from "@/styles";
import {
  FontTabletRegular14,
  FontRegular16,
  FontSemibold16,
  FontUnvisible,
  FontTabletSemibold14,
} from "./Font";
import { media } from "./media";

/*
 * 로고
 */

export const FullLogo = css`
  display: block;
  width: 160px;
`;

export const WRogo = css`
  display: block;
  width: 35px;
  padding: 5px;
`;

/*
 * 하이라이트
 */
export const HighlghtCssForHoberAfter = css<{ $isActivated?: boolean }>`
  content: "";
  position: absolute;
  background-color: ${({ $isActivated, theme }) =>
    $isActivated ? theme.color.orange200 : theme.color.gray200};
  opacity: 0.2;
  border-radius: 9999px;
  width: 100%;
  height: 100%;
`;

export const underLineHighlight = css<{ $isActivated?: boolean }>`
  &::before {
    content: "";
    position: absolute;
    bottom: -2.5px;
    justify-self: center;
    width: 100%;
    height: 4px;
    background-color: ${({ theme, $isActivated }) =>
      $isActivated ? theme.color.orange400 : "transparent"};
    border-radius: 10px;
    transition: background-color 0.2s;
  }
`;

/*
 * 아이콘 버튼
 */

export const Round9999GradientBackgroundBlackIcon = css`
  ${clickable}
  ${FontUnvisible}
  ${FlexRowCenter}
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: radial-gradient(
      29.27% 111.5% at 68.06% 54.17%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(198, 198, 198, 0) 100%
    ),
    ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  border: none;
  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange300};
  }
`;

export const Round12GradientBackgroundBlackIcon = css`
  ${Round9999GradientBackgroundBlackIcon}
  border-radius: 12px;
`;

export const HamburgerMenuButton = css`
  ${clickable}
  display: block;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const WhiteXButton = css`
  ${clickable}
  background: none;
  path {
    stroke: ${({ theme }) => theme.color.white};
    stroke-width: 2;
  }
`;

export const IconCanActiveNOpenButton = css<{
  $isOpen: boolean;
  $isActivated?: boolean;
}>`
  ${clickable}
  position: relative;
  flex-shrink: 0;
  border-radius: 9999px;
  background: ${({ $isOpen, theme }) =>
    $isOpen ? theme.color.gray75 : "none"};

  &:hover {
    background: ${({ theme }) => theme.color.gray75};
  }
`;

export const IconSmallButton = css`
  ${clickable}
  display: block;
  width: 24px;
  height: 24px;
  padding: 2px;
`;

/*
 * 텍스트 버튼
 */

export const GrayTextButton = css`
  ${FlexRowCenter}
  ${clickable}
  ${FontRegular16}
  color: ${({ theme }) => theme.color.gray400};
  width: 100%;
  background: none;
  box-shadow: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const Round9999RedBackgoundWhiteColor = css`
  ${clickable}
  ${FontTabletSemibold14}
  ${FlexRowCenter}
  ${MainColorBackground}
  color: ${({ theme }) => theme.color.white};
  width: fit-content;
  padding: 12px;
  border: none;
  border-radius: 9999px;
  gap: 8px;

  &:hover {
    scale: 1.02;
    transition: 0.2s;
  }

  ${media.tablet} {
    padding: 4px 8px;
  }
`;

export const Round9999OrangeBackgoundWhiteColor = css`
  ${Round9999RedBackgoundWhiteColor}
  ${FontSemibold16}
  background: ${({ theme }) => theme.color.orange400};
  color: ${({ theme }) => theme.color.white};
  padding: 6px 12px;
`;

export const Round9999EmptyBackgoundOrangeColor = css`
  ${clickable}
  ${FontTabletSemibold14}
  ${FlexRowCenter}
  color: ${({ theme }) => theme.color.orange400};
  width: fit-content;
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => theme.color.orange400};
  border-radius: 9999px;
  gap: 8px;
  background: none;

  &:hover {
    background: ${({ theme }) => theme.color.orange400};
    color: ${({ theme }) => theme.color.white};
    transition: 0.2s;
  }

  ${media.tablet} {
    padding: 4px 8px;
  }
`;

export const Round9999EmptyBackgoundRed600Color = css`
  ${Round9999EmptyBackgoundOrangeColor}
  color: ${({ theme }) => theme.color.red600};
  border: 1px solid ${({ theme }) => theme.color.red600};

  &:hover {
    background: ${({ theme }) => theme.color.red600};
    color: ${({ theme }) => theme.color.white};
    transition: 0.2s;
  }
`;

export const CloseButton = styled.button`
  ${GrayTextButton}
  width: auto;
  min-width: 50px;
  text-align: right;
  justify-content: flex-end;
  color: ${({ theme }) => theme.color.gray400};
  margin-left: auto;
  margin-bottom: auto;

  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const DeleteButton = styled.div`
  ${GrayTextButton}
  width: auto;
  min-width: 50px;
  text-align: right;
  justify-content: flex-end;
  color: ${({ theme }) => theme.color.gray400};
  margin-left: auto;
  margin-bottom: auto;

  &:hover {
    color: ${({ theme }) => theme.color.red600};
    text-decoration: none;
  }
`;

/*
 * 텍스트 + 아이콘 버튼
 */

export const BlackTextIconHoverBackgroundButton = css`
  ${clickable}
  ${FlexRowLeftStart}
  ${FontRegular16}
  color: ${({ theme }) => theme.color.gray400};
  gap: 10px;
  border: none;

  & > svg {
    width: 22px;
    height: 22px;
  }
`;

export const OrangeBlodTextIconHoverBackgroundButton = css`
  ${BlackTextIconHoverBackgroundButton}
  ${FontSemibold16}

  & > svg {
    stroke: ${({ theme }) => theme.color.orange400};
    stroke-width: 2;
  }

  color: ${({ theme }) => theme.color.orange400};
`;

export const GrayTextIconHoverBackgroundButton = css`
  ${BlackTextIconHoverBackgroundButton}
  color: ${({ theme }) => theme.color.gray400};
`;
