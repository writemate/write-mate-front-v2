"use client";
import { TextCountContainer } from "@/styles/workspace/Script.styles";
import { useEffect, useState } from "react";

export default function TextCount({ editorRef }: { editorRef: any }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();

      quill.on("text-change", () => {
        const editor = editorRef.current.getEditor();
        const text = editor.getText(); // 모든 텍스트 가져오기 (HTML 태그 제외)
        const length = text.trim().length; // 공백 제거 후 글자 수 계산
        setCharCount(length);
      });
    }
  });
  return <TextCountContainer>{charCount}자 (공백포함)</TextCountContainer>;
}
