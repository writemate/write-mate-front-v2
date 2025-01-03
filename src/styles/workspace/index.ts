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
  $isLeftOpen: boolean;
  $isRightOpen: boolean;
}>`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 65px;
  padding-left: max(
    28px,
    ${({ $isLeftOpen }) =>
      $isLeftOpen
        ? `calc((100% - 1012px) / 2 - 258px)`
        : "calc((100% - 1012px) / 2)"}
  );
  padding-right: max(
    28px,
    ${({ $isRightOpen }) =>
      $isRightOpen
        ? `calc((100% - 1012px) / 2 - 309px)`
        : "calc((100% - 1012px) / 2)"}
  );
  padding-bottom: 60px;
  overflow-y: auto;

  ${media.tablet} {
    padding: 15px;
  }
`;

export const Title = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  font-size: 28px;
  line-height: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray900};

  ${media.tablet} {
    font-size: 16px;
    line-height: 150%;
  }
`;

export const TitleContainer = styled.h1`
  width: 100%;
  padding-top: 36px;
`;
