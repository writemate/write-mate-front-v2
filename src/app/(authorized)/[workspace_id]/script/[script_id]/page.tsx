"use client";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import {
  ToolbarContainer,
  EditorContainer,
  Undo,
  Redo,
} from "@/styles/workspace/Script.styles";
import styled from "styled-components";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CustomToolbar = ({ editorRef }: { editorRef: any }) => {
  const handleUndo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.undo(); // Undo 동작
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.redo(); // Redo 동작
    }
  };

  return (
    <ToolbarContainer id="toolbar">
      {/* 되돌리기, 다시하기 */}
      <Undo onClick={handleUndo} />
      <Redo onClick={handleRedo} />
      <div className="ql-line"> </div>

      {/* 폰트 */}
      <select className="ql-font"></select>
      {/* 헤더 크기 */}
      <select className="ql-header">
        <option value="1">제목 1</option>
        <option value="2">제목 2</option>
        <option value="3">제목 3</option>
        <option value="">본문</option>
        <option value="5">옵션</option>
      </select>
      <div className="ql-line"> </div>

      {/* 글꼴 스타일 */}
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      {/* 블록 요소 */}
      <button className="ql-blockquote"></button>
      <div className="ql-line"> </div>
      {/* 색상 및 배경 */}
      <select className="ql-color"></select>
      <select className="ql-background"></select>
      <div className="ql-line"> </div>

      {/* 링크, 이미지, 비디오, 수식 */}
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <div className="ql-line"> </div>

      {/* 리스트 */}
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-list" value="check"></button>
      <div className="ql-line"> </div>

      {/* 들여쓰기/내어쓰기 */}
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <div className="ql-line"> </div>

      {/* 텍스트 방향 */}
      <button className="ql-direction" value="rtl"></button>
      {/* 정렬 */}
      <select className="ql-align"></select>
    </ToolbarContainer>
  );
};

const QuillEditor = ({ innerRef }: { innerRef: any }) => {
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(content);
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    history: {
      delay: 2000, // 2초마다 저장
      maxStack: 500, // 최대 500개까지 히스토리 저장
      userOnly: true, // 사용자가 변경한 내용만 저장
    },
  };

  return (
    <EditorContainer>
      <ReactQuill
        ref={innerRef}
        value={value}
        onChange={handleChange}
        modules={modules}
        placeholder="내용을 입력하세요."
      ></ReactQuill>
    </EditorContainer>
  );
};

const MainContainer = styled.div`
  flex-grow: 1;
  position: absolute;
  height: 100%;
  width: 100%;
  //최대 너비가 1012px이면서 최소 패딩이 28px이도록
  padding: 0 max(28px, calc((100% - 1012px) / 2));
  overflow-y: auto;
`;

export default function Script({
  params: { workspace_id },
}: {
  params: { workspace_id: string };
}) {
  console.log(workspace_id);
  const editorRef = useRef(null); // Quill 에디터를 참조할 ref

  return (
    <>
      <CustomToolbar editorRef={editorRef} />
      <MainContainer>
        <QuillEditor innerRef={editorRef} />
      </MainContainer>
    </>
  );
}
