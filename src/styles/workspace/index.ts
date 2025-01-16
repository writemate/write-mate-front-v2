"use client";
import { FlexColumnCenter, FlexRowLeftStart } from "@/styles";
import { styled } from "styled-components";
import { media } from "../media";

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
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  max-width: ${({ $isScriptPage }) => ($isScriptPage ? "none" : "1012px")};
  position: relative;
  padding: ${({ $isScriptPage }) =>
    $isScriptPage ? "0" : "65px 28px 60px 28px"};
  margin-left: auto;
  margin-right: auto;
  overflow-y: auto;

  ${media.tablet} {
    padding: ${({ $isScriptPage }) =>
      $isScriptPage ? "0" : "20px 16px 20px 16px"};
  }
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  font-size: 28px;
  line-height: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 69px;

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
