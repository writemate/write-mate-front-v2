"use client";
import {
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowLeftStart,
} from "@/styles";
import { styled } from "styled-components";
import { media } from "../media";
import { FontBold20, FontBold24, FontBold28, FontSemibold16 } from "../Font";

export const WorkspaceContainer = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  height: 100%;
  background-color: #f8f9fb;

  ${media.tablet} {
    flex-direction: column;
  }
`;

export const HeaderAndMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray25};
`;

export const SideBarAndMainContainer = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  height: calc(100% - 72px);
`;
export const MainContainer = styled.div<{
  $isScriptPage: boolean;
  $isLeftOpen: boolean;
  $isRightOpen: boolean;
}>`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: ${({ $isScriptPage }) => ($isScriptPage ? "0" : "65px")};
  padding-left: ${({ $isScriptPage, $isLeftOpen }) =>
    $isScriptPage
      ? "0"
      : `max(28px, ${
          $isLeftOpen
            ? `calc((100% - 1012px) / 2 - 258px)`
            : "calc((100% - 1012px) / 2)"
        })`};
  padding-right: ${({ $isScriptPage, $isRightOpen }) =>
    $isScriptPage
      ? "0"
      : `max(28px, ${
          $isRightOpen
            ? `calc((100% - 1012px) / 2 - 309px)`
            : "calc((100% - 1012px) / 2)"
        })`};
  padding-bottom: ${({ $isScriptPage }) => ($isScriptPage ? "0" : "60px")};
  overflow-y: auto;
`;

export const Title = styled.div`
  position: relative;
  ${FlexColumnLeftStart}
  ${FontBold28}
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 40px;
  align-items: flex-start;

  input {
    ${FontBold28}
    color: ${({ theme }) => theme.color.gray900};
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
  }

  ${media.tablet} {
    ${FontBold20}
    input {
      ${FontBold20}
    }
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const Subtitle = styled.div`
  position: relative;
  ${FontSemibold16}
  width: 100%;
  color: ${({ theme }) => theme.color.gray400};
  input {
    ${FontSemibold16}
    color: ${({ theme }) => theme.color.gray400};
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
  }
`;

export const TitleContainer = styled.h1`
  width: 100%;
  padding-top: 36px;
`;
