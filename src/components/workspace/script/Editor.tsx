"use client";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import { ScriptContext } from "@/hooks/workspace/script";
import { WhiteInputSpaceContainer } from "@/styles/workspace/Script.styles";

export default function QuillEditor() {
  const { editorRef, handleQuillChange } = useContext(ScriptContext);

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.getEditor();
      editor.focus();
      const length = editor.getLength();
      editor.setSelection(0, length);
      editor.format("font", "nanum-myeongjo");
      editor.format("size", "18px");
    }
  }, [editorRef]);

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

  return (
    <WhiteInputSpaceContainer>
      <ReactQuill
        modules={modules}
        theme="snow"
        ref={editorRef}
        onChange={handleQuillChange}
      />
    </WhiteInputSpaceContainer>
  );
}
