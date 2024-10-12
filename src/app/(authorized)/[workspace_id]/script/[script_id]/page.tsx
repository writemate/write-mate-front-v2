"use client";
import ReactQuill from "react-quill";
import { useState, useRef, use, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import {
  ToolbarContainer,
  EditorContainer,
  MainContainer,
  Undo,
  Redo,
} from "@/styles/workspace/Script.styles";

interface DeltaOperation {
  insert?: string | Record<string, any>; // insert는 문자열 또는 객체일 수 있음
  delete?: number;
  retain?: number;
}

const CustomToolbar = ({ editorRef }: { editorRef: any }) => {
  const handleUndo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.undo();
    }
  };

  const handleRedo = () => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.history.redo();
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

const QuillEditor = ({
  innerRef,
  MainRef,
}: {
  innerRef: any;
  MainRef: any;
}) => {
  const containerRef = useRef(null); // EditorContainer ref
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(content);
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  const getCursorLineNumber = () => {
    const editor = innerRef.current.getEditor(); // Quill 인스턴스에 접근
    const range = editor.getSelection(); // 현재 선택 범위 또는 커서 위치 가져오기

    if (range) {
      const index = range.index;
      const delta = editor?.getContents().ops as DeltaOperation[]; // DeltaOperation[]으로 명시적 타입 지정
      let content = "";

      // 전체 Delta를 문자열로 변환 (삽입된 내용만 추출)
      delta.forEach((op: DeltaOperation) => {
        if (op.insert && typeof op.insert === "string") {
          content += op.insert;
        }
      });

      // 커서 위치까지의 텍스트를 자르고, 줄바꿈(\n)의 개수를 카운트
      const textBeforeCursor = content.slice(0, index);
      const lineNumber = textBeforeCursor.split("\n").length;

      console.log(`Current line number: ${lineNumber}`);
      return lineNumber;
    } else {
      console.log("Cursor is not in the editor.");
      return 0;
    }
  };

  useEffect(() => {
    if (innerRef.current) {
      const quill = innerRef.current.getEditor();
      const container = MainRef.current;
      const editor = innerRef.current.getEditor().root;

      // Listen for text change events
      quill.on("text-change", () => {
        //현재 입력 위치: 원고 영역 전체 길이 / 원고 줄 수 * 현재 줄수
        const onelineheight = () => {
          const pElement = editor.querySelector(".ql-editor p");
          if (pElement) {
            const computedStyle = window.getComputedStyle(pElement);
            return parseInt(computedStyle.height);
          }
          return 0;
        };
        const editorContainerPaddingTop = () => {
          if (containerRef.current) {
            return parseInt(
              window.getComputedStyle(containerRef.current).paddingTop
            );
          }
          return 0;
        };
        const currentLine =
          200 +
          editorContainerPaddingTop() +
          12 +
          onelineheight() * (getCursorLineNumber() + 1);

        const shouldScroll =
          currentLine - container.scrollTop > container.clientHeight - 50;

        console.log(shouldScroll);

        if (shouldScroll) {
          // Scroll the MainContainer smoothly to the bottom
          container.scrollTo({
            top: container.scrollHeight + 200,
            behavior: "smooth",
          });
        }
      });
    }
  }, []);

  return (
    <EditorContainer ref={containerRef}>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        placeholder="내용을 입력하세요."
        ref={innerRef}
      ></ReactQuill>
    </EditorContainer>
  );
};

export default function Script({
  params: { workspace_id },
}: {
  params: { workspace_id: string };
}) {
  console.log(workspace_id);
  const editorRef = useRef(null);
  const mainRef = useRef(null);

  return (
    <>
      <CustomToolbar editorRef={editorRef} />
      <MainContainer ref={mainRef}>
        <QuillEditor innerRef={editorRef} MainRef={mainRef} />
      </MainContainer>
    </>
  );
}
