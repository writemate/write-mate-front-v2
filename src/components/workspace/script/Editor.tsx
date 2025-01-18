"use client";
import ReactQuill, { Range } from "react-quill";
import { useContext } from "react";
import "react-quill/dist/quill.snow.css";
import { ScriptContext } from "@/hooks/workspace/script";
import { WhiteInputSpaceContainer } from "@/styles/workspace/Script.styles";

export default function QuillEditor() {
  const { editorRef, handleQuillChange } = useContext(ScriptContext);

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "link",
    "image",
    "video",
    "list",
    "indent",
    "direction",
    "align",
    "clean",
  ];

  return (
    <WhiteInputSpaceContainer>
      <ReactQuill
        modules={modules}
        formats={formats} // formats 추가
        theme="snow"
        placeholder="내용을 입력하세요."
        ref={editorRef}
        onChange={handleQuillChange}
      ></ReactQuill>
    </WhiteInputSpaceContainer>
  );
}
