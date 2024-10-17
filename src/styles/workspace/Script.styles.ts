"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import RedoIcon from "@/assets/workspace/script/redo.svg";
import UndoIcon from "@/assets/workspace/script/undo.svg";

export const TextCountContainer = styled.div`
  position: absolute;
  font-size: 14px;
  color: #a0a0a0;
  margin-left: 10px;
  bottom: 10px;
  right: 10px;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: #ffffff;
  border-right: none !important;
  border-left: none !important;
  border-top: none !important;
  border-bottom: 1px solid #d7dce7 !important;

  .ql-line {
    border: 0.5px solid #e8eef7 !important;
    margin-right: 10px !important;
    margin-left: 10px !important;
  }

  .ql-picker-options {
    box-shadow: 0px 4px 8px rgba(30, 33, 43, 0.2) !important;
    border-radius: 0px 0px 8px 8px !important;
  }

   {
    /* 폰트 */
  }
  .ql-font span[data-value="nanum-gothic"]::before {
    font-family: "NanumGothic";
  }

  .ql-font span[data-value="nanum-myeongjo"]::before {
    font-family: "NanumMyeongjo";
  }
`;

export const Undo = styled(UndoIcon)`
  ${clickable}
  margin-left: 10px;
`;
export const Redo = styled(RedoIcon)`
  ${clickable}
  margin-right: 10px;
`;

export const EditorContainer = styled.div`
  padding: calc(14.2857% - 12px) calc(12.0635% - 15px) calc(12.0635% - 12px)
    calc(12.0635% - 15px); /* A4 비율에 맞게 padding 조정  */
  width: 100%;
  min-height: 100%;
  background: #ffffff;

  .ql-container {
    border: none !important;
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
  }

  .ql-font-nanum-myeongjo {
    font-family: "NanumMyeongjo";
  }
`;

export const MainContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  width: 100%;
  padding: 20px max(28px, calc((100% - 1012px) / 2)) 0;
  overflow-y: auto;
`;

export const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
