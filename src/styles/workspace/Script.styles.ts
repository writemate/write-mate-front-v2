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
  margin-top: 200px; /* 원하는 빈 공간 크기로 설정 */
  width: 100% !important;
  background: #ffffff;
  padding: 70px;

  .ql-container {
    border: none !important;
    min-height: 1269px;
    display: flex;
    justify-content: center;
  }

  .ql-editor {
    width: 100%;
    min-height: 200px;
  }
`;
