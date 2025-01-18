"use client";
import "react-quill/dist/quill.snow.css";
import {
  ScriptMainContainer,
  ScriptContainer,
} from "@/styles/workspace/Script.styles";
import CustomToolbar from "@/components/workspace/script/Toolbar";
import QuillEditor from "@/components/workspace/script/Editor";
import TextCount from "@/components/workspace/script/TextCount";
import { ScriptContext, useScript } from "@/hooks/workspace/script";

export default function Script() {
  const useScriptValue = useScript();
  const { editorRef } = useScriptValue;

  return (
    <ScriptContext.Provider value={useScriptValue}>
      <ScriptContainer>
        <CustomToolbar editorRef={editorRef} />
        <ScriptMainContainer>
          <QuillEditor />
        </ScriptMainContainer>
        <TextCount editorRef={editorRef}></TextCount>
      </ScriptContainer>
    </ScriptContext.Provider>
  );
}
