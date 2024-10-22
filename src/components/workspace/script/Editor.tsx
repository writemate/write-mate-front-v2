"use client";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { EditorContainer } from "@/styles/workspace/Script.styles";
import "react-quill/dist/quill.snow.css";
import { fontSize, font } from "./Toolbar";

export default function QuillEditor({
  innerRef,
  MainRef,
}: {
  innerRef: any;
  MainRef: any;
}) {
  const containerRef = useRef(null);
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

  const getCursorMetrics = () => {
    const quill = innerRef.current.getEditor();
    var distanceFromTop = 0;
    var lineHeight = 0;

    const hasFocus = quill.hasFocus();
    if (hasFocus) {
      const range = quill.getSelection();
      const bounds = quill.getBounds(range.index);
      const editorContainer = document.querySelector(
        ".ql-editor"
      ) as HTMLElement;
      const lineElement = editorContainer.querySelector(
        `p.span[data-line-index="${range.index}"]`
      ) as HTMLElement;
      distanceFromTop = bounds.top;
      lineHeight = lineElement ? lineElement.offsetHeight : bounds.height;
    }
    return { distanceFromTop, lineHeight, hasFocus };
  };

  const editorContainerPaddingTop = () => {
    if (containerRef.current) {
      return parseFloat(
        window.getComputedStyle(containerRef.current).paddingTop
      );
    }
    return 0;
  };

  const handleAutoScroll = () => {
    // 1. 자동 스크롤 구현 (완료)
    // 자동 스크롤이 일어나는 조건 : 커서가 활성화되어 있고, 현재 라인이 화면 밑에 가려져 있을 때
    // 얼마나 스크롤 되는가? : 현재 라인을 가장 밑줄로 올리는 만큼 스크롤

    // 2. 문제 1 : paste 이벤트 발생 자동 스크롤의 조건이 달성되지 않았으나 스크롤이 일어남
    // 문제의 원인 : paste 이벤트 발생 시, 커서가 활성화되어 있지 않아도 quill editor 내부적으로 커서가 활성화되어 있음?

    const container = MainRef.current;
    const CursorMetrics = getCursorMetrics();

    const currentLine =
      parseFloat("50") +
      editorContainerPaddingTop() +
      parseFloat("12") +
      CursorMetrics.distanceFromTop +
      CursorMetrics.lineHeight;

    const autoScrollStartThreshold =
      parseFloat(container.scrollTop) +
      parseFloat(container.clientHeight) -
      editorContainerPaddingTop() * 0.7;

    const isOverflow = currentLine >= autoScrollStartThreshold;

    const targetAutoScrollTop =
      currentLine + editorContainerPaddingTop() * 0.7 - container.clientHeight;

    console.log(editorContainerPaddingTop(), isOverflow, targetAutoScrollTop);
    if (isOverflow) {
      container.scrollTo(0, targetAutoScrollTop);
    }
  };

  const handleMouseDown = (event: any) => {
    const quillEditor = innerRef.current.getEditor().root;
    if (quillEditor && quillEditor.contains(event.target)) {
      return;
    } else {
      event.preventDefault();
    }
  };

  
  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
  
  const [cursorPositionAfterPaste, setCursorPositionAfterPaste] = useState<number | null>(null);
  const isPasted = cursorPositionAfterPaste !== null;

  const handleEditorChange = useCallback((quill:any)=>(eventName: string, ...args: any[]) => {
    if (eventName === "selection-change") {
      if(isPasted){
        quill.setSelection(cursorPositionAfterPaste);
        setCursorPositionAfterPaste(null);
      }
      handleAutoScroll();
      return;
    }
    if (eventName === "text-change") {
      console.log(args[0]);
      if(args[0].ops.length !== 2) return;
      const retain = args[0].ops[0].retain;
      if(retain === undefined) return;
      const insert = args[0].ops[1].insert;
      if(insert === undefined) return;
      if(insert.length < 2) return;
      setCursorPositionAfterPaste(retain + insert.length);
    }
  }, [cursorPositionAfterPaste]);

  useEffect(() => {
    if (!innerRef.current) return;
    const quill = innerRef.current.getEditor();
    const handler = handleEditorChange(quill);
    quill.on("editor-change", handler);
    return () => {
      quill.off("editor-change", handler);
    };
  }, [innerRef.current, handleEditorChange]);

  return (
    <EditorContainer ref={containerRef}>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        scrollingContainer={MainRef.current ?? undefined}
        placeholder="내용을 입력하세요."
        ref={innerRef}
      ></ReactQuill>
    </EditorContainer>
  );
}
