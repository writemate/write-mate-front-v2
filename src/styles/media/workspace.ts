"use client";
import { css } from "styled-components";
import { media } from ".";
import {
  HeaderTitle,
  SaveStatus,
  VersionControlButton,
  RightContainer,
} from "../workspace/Header.styles";

export const TabletHeaderContainer = css`
  ${media.tablet} {
    ${HeaderTitle} {
      font-size: 20px;
      margin: 0 16px 0 20px;
    }
    ${SaveStatus} {
      font-size: 12px;
    }
    ${VersionControlButton} {
      font-size: 14px;
      padding: 6px 8px 6px 16px;
    }
    ${RightContainer} {
      margin-left: 12px;
      margin-right: 20px;
      gap: 8px;
    }
  }
`;
