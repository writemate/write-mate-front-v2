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

export const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  width: 100%;
  background: #ffffff;
  border-right: none !important;
  border-left: none !important;
  border-top: none !important;
  border-bottom: 1px solid #d7dce7 !important;
  z-index: 100;

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
  margin-top: 200px;
  padding: calc(14.2857% - 12px) calc(12.0635% - 15px) calc(12.0635% - 12px)
    calc(12.0635% - 15px); /* A4 비율에 맞게 padding 조정  */
  width: 100%;
  min-height: calc(100% - 200px);
  background: #ffffff;

  .ql-container {
    border: none !important;
  }

  .ql-editor {
    font-size: 11pt;

    p {
      font-family: "NanumGothic" !important;
    }
  }

  .ql-font-nanum-myeongjo {
    font-family: "NanumMyeongjo";
  }
`;

export const MainContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 max(28px, calc((100% - 1012px) / 2));
  overflow-y: auto;
`;
