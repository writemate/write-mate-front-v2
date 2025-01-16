"use client";
import ReactQuill from "react-quill";
import { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { ScriptContext } from "@/hooks/workspace/script";
import { TextAreaContainer } from "@/styles/workspace/Script.styles";

export default function QuillEditor() {
  const { editorRef, mainRef, containerRef, value, handleChange } =
    useContext(ScriptContext);

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

  return (
    <TextAreaContainer ref={containerRef}>
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        scrollingContainer={mainRef.current ?? undefined}
        placeholder="내용을 입력하세요."
        ref={editorRef}
      ></ReactQuill>
    </TextAreaContainer>
  );
}
