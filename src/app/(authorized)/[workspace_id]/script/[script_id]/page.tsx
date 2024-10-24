"use client";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { EditorWrapper, MainContainer } from "@/styles/workspace/Script.styles";
import CustomToolbar from "@/components/workspace/script/Toolbar";
import QuillEditor from "@/components/workspace/script/Editor";
import TextCount from "@/components/workspace/script/TextCount";

export default function Script() {
  const editorRef = useRef(null);
  const mainRef = useRef(null);

  return (
    <EditorWrapper>
      <CustomToolbar editorRef={editorRef} />
      <MainContainer ref={mainRef}>
        <QuillEditor innerRef={editorRef} MainRef={mainRef} />
      </MainContainer>
      <TextCount editorRef={editorRef}></TextCount>
    </EditorWrapper>
  );
}
