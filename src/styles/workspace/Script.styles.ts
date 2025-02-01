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
import Quill from "quill";

// 폰트 등록
const Font = Quill.import("formats/font") as any;
Font.whitelist = ["nanum-gothic", "nanum-myeongjo"];
Quill.register(Font, true);

// 사이즈 등록
const Size = Quill.import("attributors/style/size") as any;
Size.whitelist = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "30px",
  "36px",
];
Quill.register(Size, true);

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

export const GrayMainContainer = styled.div`
  ${FlexColumnCenter}
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const WhiteInputSpaceContainer = styled.div`
  width: 100%;
  max-width: 1012px;
  padding: 0 28px;
  margin: 25vh auto;

  ${media.tablet} {
    padding: 0 10px;
    margin: 2vh auto;
  }

  .ql-container {
    position: relative;
    background: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.gray75};
    width: 100%;
    min-height: 100vh;
    flex: 1;
  }

  .ql-editor {
    padding: 119px 95px;
    p {
      font-family: "NanumMyeongjo", sans-serif;
      font-size: 18px;
    }

    &.ql-blank::before {
      padding: 119px 95px;
      left: 0;
      top: 0;
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

  .ql-font-nanum-gothic {
    font-family: "NanumGothic";
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
