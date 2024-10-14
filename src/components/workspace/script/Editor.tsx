"use client";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
import { EditorContainer } from "@/styles/workspace/Script.styles";
import "react-quill/dist/quill.snow.css";
import { fontSize } from "./Toolbar";

interface DeltaOperation {
  insert?: string | Record<string, any>; // insert는 문자열 또는 객체일 수 있음
  delete?: number;
  retain?: number;
}

export default function QuillEditor({
  innerRef,
  MainRef,
}: {
  innerRef: any;
  MainRef: any;
}) {
  const containerRef = useRef(null); // EditorContainer ref
  const [value, setValue] = useState("");
  const handleChange = (content: string) => {
    setValue(content);
  };

  const fontSizeStyle = ReactQuill.Quill.import(
    "attributors/style/size"
  ) as any;
  fontSizeStyle.whitelist = fontSize;
  ReactQuill.Quill.register(fontSizeStyle, true);

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
      const delta = editor.getContents().ops as DeltaOperation[]; // DeltaOperation[]으로 명시적 타입 지정
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
      const container = MainRef.current;
      const quill = innerRef.current.getEditor();
      const editor = innerRef.current.getEditor().root;

      quill.on("text-change", () => {
        const onelineheight = () => {
          const pElement = editor.querySelector(".ql-editor p");
          if (pElement) {
            const computedStyle = window.getComputedStyle(pElement);
            return parseFloat(computedStyle.height);
          }
          return 0;
        };
        const editorContainerPaddingTop = () => {
          if (containerRef.current) {
            return parseFloat(
              window.getComputedStyle(containerRef.current).paddingTop
            );
          }
          return 0;
        };
        const currentLine =
          parseFloat("200") +
          editorContainerPaddingTop() +
          parseFloat("12") +
          onelineheight() * getCursorLineNumber();

        const shouldScroll =
          currentLine - parseFloat(container.scrollTop) >
          parseFloat(container.clientHeight) - onelineheight() * 3;

        console.log(
          shouldScroll,
          currentLine,
          container.scrollTop,
          container.clientHeight,
          onelineheight()
        );

        if (shouldScroll) {
          // Scroll the MainContainer smoothly to the bottom
          container.scrollTo({
            top: currentLine - container.clientHeight + onelineheight() * 3,
            behavior: "auto",
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
}
