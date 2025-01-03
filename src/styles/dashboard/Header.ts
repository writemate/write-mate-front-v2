"use client";
import { media } from "@/styles/media";
import { styled } from "styled-components";
import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import { clickable } from "..";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  margin-bottom: 60px;

  ${media.tablet} {
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

export const HeaderLeftButton = styled.button`
  display: flex;
  height: fit-content;
  weight: fit-content;
  padding: 11.5px 12px;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;

  border-radius: 9999px;
  background: ${({ theme }) => theme.color.red400};
  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);

  border: none;

  &:hover {
    filter: brightness(95%);
  }

  p {
    color: ${({ theme }) => theme.color.white};
    font-size: 14px;
    font-style: normal;
    font-weight: 350;
    line-height: 21px;
    letter-spacing: -0.16px;
  }

  ${media.tablet} {
    background: none;
    box-shadow: none;
    outline: none;
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

export const HeaderRightButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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

  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.12));
  border: none;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange300};
  }
  p {
    display: none;
  }

  ${media.tablet} {
    width: 100%;
    background: none;
    box-shadow: none;
    outline: none;
    & > p {
      display: flex;
      color: ${({ theme }) => theme.color.gray400};
    }
  }
`;

export const HearderProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: radial-gradient(
      29.27% 111.5% at 68.06% 54.17%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(198, 198, 198, 0) 100%
    ),
    ${({ theme }) => theme.color.white};

  /* icon Shadow */
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  border: none;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange300};
  }
  p {
    display: none;
  }

  ${media.tablet} {
    width: 100%;
    background: none;
    box-shadow: none;
    outline: none;
    & > p {
      display: flex;
      color: ${({ theme }) => theme.color.gray400};
    }
  }
`;

export const HamburgerMenuButton = styled(HamburgerMenu)`
  display: none;

  ${media.tablet} {
    ${clickable}
    display: block;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const HamburgerMenuContainer = styled.div`
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
