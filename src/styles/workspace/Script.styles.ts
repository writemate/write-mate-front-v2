"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
  MainContainer,
} from "@/styles";
import RedoIcon from "@/assets/workspace/script/redo.svg";
import UndoIcon from "@/assets/workspace/script/undo.svg";
import { media } from "../media";

export const ScriptContainer = styled.div`
  ${FlexColumnLeftStart}
  min-height: 100%;
  width: 100%;
  overflow: hidden;
`;

export const ToolbarContainer = styled.div`
  position: relative;
  ${FlexRowLeftStart}
  flex-wrap: wrap;
  width: 100%;

  background: ${({ theme }) => theme.color.white};
  border-right: none !important;
  border-left: none !important;
  border-top: none !important;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray25};

  .ql-line {
    border: 0.5px solid #e8eef7 !important;
    margin-right: 10px !important;
    margin-left: 10px !important;
  }

  .ql-picker-options {
    box-shadow: 0px 4px 8px rgba(30, 33, 43, 0.2) !important;
    border-radius: 0px 0px 8px 8px !important;
  }

  .ql-font span[data-value="nanum-gothic"]::before {
    font-family: "NanumGothic";
  }

  .ql-font span[data-value="nanum-myeongjo"]::before {
    font-family: "NanumMyeongjo";
  }
`;

export const ScriptMainContainer = styled.div`
  ${FlexColumnCenter}
  flex-grow: 1;
  height: 100%;
  width: 100%;
  max-width: 1012px;
  position: relative;
  padding: 65px 28px 60px 28px;
  margin: 0 auto;
  overflow-y: auto;

  ${media.tablet} {
    padding: 20px 16px 20px 16px;
  }
`;

export const TextAreaContainer = styled.div`
  background: ${({ theme }) => theme.color.white};
  position: relative;
  width: 100%;

  .ql-container {
    border: none;
    min-height: 75vh;
  }

  .ql-editor {
    p,
    ol,
    ul,
    pre,
    blockquote {
      font-size: 11pt;
      line-height: 1.6;
      font-family: "NanumGothic";
    }

    padding: 119px 95px;
    &.ql-blank::before {
      left: 0;
      top: 0; // 상단 위치 조정
      font-style: normal;
      padding: 119px 95px;
      color: ${({ theme }) => theme.color.gray400}; /* placeholder 색상 설정 */
    }

    ${media.tablet} {
      padding: 40px 20px;

      &.ql-blank::before {
        padding: 40px 20px;
      }
    }
  }

  .ql-font-nanum-myeongjo {
    font-family: "NanumMyeongjo";
  }

  .ql-clipboard {
    display: none;
  }
`;

export const TextCountContainer = styled.div`
  position: absolute;
  font-size: 14px;
  color: #a0a0a0;
  margin-left: 10px;
  bottom: 10px;
  right: 10px;
`;

export const Undo = styled(UndoIcon)`
  ${clickable}
  margin-left: 10px;
`;
export const Redo = styled(RedoIcon)`
  ${clickable}
  margin-right: 10px;
`;
