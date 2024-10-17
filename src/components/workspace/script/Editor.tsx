"use client";
import ReactQuill from "react-quill";
import { useState, useRef, useEffect } from "react";
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
    const range = quill.getSelection();
    const distanceFromTop = 0;
    const lineHeight = 0;

    if (range) {
      const bounds = quill.getBounds(range.index);
      const distanceFromTop = bounds.top;
      const editorContainer = document.querySelector(
        ".ql-editor"
      ) as HTMLElement;
      const lineElement = editorContainer.querySelector(
        `p.span[data-line-index="${range.index}"]`
      ) as HTMLElement;
      const lineHeight = lineElement ? lineElement.offsetHeight : bounds.height;

      console.log("커서가 top으로부터 떨어진 거리:", distanceFromTop);
      console.log("현재 위치한 줄의 높이:", lineHeight);
      return { distanceFromTop, lineHeight };
    }
    return { distanceFromTop, lineHeight };
  };

  const editorContainerPaddingTop = () => {
    if (containerRef.current) {
      return parseFloat(
        window.getComputedStyle(containerRef.current).paddingTop
      );
    }
    return 0;
  };

  const controlScroll = () => {
    const container = MainRef.current;
    const CursorMetrics = getCursorMetrics();
    const currentLine =
      parseFloat("50") +
      editorContainerPaddingTop() +
      parseFloat("12") +
      CursorMetrics.distanceFromTop;

    const shouldScroll =
      currentLine - parseFloat(container.scrollTop) >
      parseFloat(container.clientHeight) - 200;

    if (shouldScroll) {
      container.scrollTo({
        top: currentLine - container.clientHeight + 200,
        behavior: "auto",
      });
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

    if (innerRef.current) {
      const quill = innerRef.current.getEditor();
      quill.on("text-change", controlScroll);
    }

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
        theme="snow"
        scrollingContainer="html"
        placeholder="내용을 입력하세요."
        ref={innerRef}
      ></ReactQuill>
    </EditorContainer>
  );
}
