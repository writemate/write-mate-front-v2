"use client";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
import { EditorContainer } from "@/styles/workspace/Script.styles";
import "react-quill/dist/quill.snow.css";
import { fontSize, font } from "./Toolbar";

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

  const Font = ReactQuill.Quill.import("formats/font") as any;
  Font.whitelist = font;
  ReactQuill.Quill.register(Font, true);

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
  // 커서의 위치와 현재 줄의 높이를 계산하는 함수
  const getCursorMetrics = () => {
    const quill = innerRef.current.getEditor();
    const range = quill.getSelection();
    if (range) {
      // 현재 커서 위치의 범위를 기준으로 bounds를 계산합니다.
      const bounds = quill.getBounds(range.index);

      // 커서 위치가 editor 컨테이너의 top으로부터 얼마나 떨어져 있는지
      const distanceFromTop = bounds.top;

      // 커서가 위치한 줄의 p 태그의 높이 가져오기
      const editorContainer = document.querySelector(
        ".ql-editor"
      ) as HTMLElement;
      const lineElement = editorContainer.querySelector(
        `p[data-line-index="${range.index}"]`
      ) as HTMLElement;

      // lineElement가 존재하는지 확인 후 높이 계산
      const lineHeight = lineElement ? lineElement.scrollHeight : bounds.height;

      console.log("커서가 top으로부터 떨어진 거리:", distanceFromTop);
      console.log("현재 위치한 줄의 높이:", lineHeight);

      return { distanceFromTop, lineHeight };
    } else {
      console.log("현재 선택된 범위가 없습니다.");
      return null;
    }
  };

  // Quill에서 내용이 변경될 때마다 커서 정보를
  useEffect(() => {
    const handleMouseDown = (event: any) => {
      const quillEditor = innerRef.current.getEditor().root;
      if (quillEditor && quillEditor.contains(event.target)) {
        // Quill 에디터 내부를 클릭한 경우, 기본 동작 유지
        return;
      } else {
        // Quill 에디터 외부를 클릭한 경우, 선택 해제 방지
        event.preventDefault();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    if (innerRef.current) {
      const container = MainRef.current;
      const quill = innerRef.current.getEditor();
      const editor = innerRef.current.getEditor().root;
      quill.on("text-change", getCursorMetrics);
      quill.on("selection-change", getCursorMetrics);
      quill.on("text-change", () => {
        const onelineheight = () => {
          //console.log(quill.editor.delta);
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
          parseFloat("50") +
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

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
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
