"use client";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { MainContainer } from "@/styles/workspace/Script.styles";
import CustomToolbar from "@/components/workspace/script/Toolbar";
import QuillEditor from "@/components/workspace/script/Editor";

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
