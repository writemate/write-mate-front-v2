"use client";
import {
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowLeftStart,
} from "@/styles";
import { styled } from "styled-components";
import { media } from "../media";
import { FontBold28, FontSemibold16 } from "../Font";

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
}>`
  ${FlexColumnLeftStart}
  flex-grow: 1;
  height: 100%;
  position: relative;
  padding-top: 65px;
  padding-bottom: 100px;
  padding-left: ${({ $isScriptPage }) =>
    $isScriptPage ? "0" : "max(28px, calc(50% - 512px))"};
  padding-right: ${({ $isScriptPage }) =>
    $isScriptPage ? "0" : "max(28px, calc(50% - 512px))"};
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;

  ${media.tablet} {
    padding: ${({ $isScriptPage }) =>
      $isScriptPage ? "0" : "20px 16px 40px 16px"};
  }
`;

export const Title = styled.div`
  position: relative;
  ${FlexColumnLeftStart}
  ${FontBold28}
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 52px;
  align-items: center;

  input {
    ${FontBold28}
    color: ${({ theme }) => theme.color.gray900};
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
  }

  ${media.tablet} {
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 20px;
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

  ${media.tablet} {
    font-size: 16px;
    line-height: 150%;
    margin-bottom: 20px;
  }
`;

export const TitleContainer = styled.h1`
  width: 100%;
  padding-top: 36px;
`;
