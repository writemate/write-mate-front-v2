import { createContext, useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useParams } from "next/navigation";
import { useInputLiveUpdate } from "../common/useInputLiveUpdate";
import { getScript, updateScriptContent } from "@/utils/APIs/workspace";

export function useScript() {
  const editorRef = useRef<ReactQuill | null>(null);
  const { workspace_id, script_id } = useParams<{
    workspace_id: string;
    script_id: string;
  }>();

  const { data } = useQuery({
    queryKey: workspaceQueryKeys.script(workspace_id, script_id),
    queryFn: getScript(script_id),
  });

  const onChangeScript = useInputLiveUpdate(
    updateScriptContent(script_id),
    "스크립트를 저장 중입니다.",
    "스크립트를 저장하는 중에 문제가 발생했습니다."
  );

  const handleQuillChange = useCallback(() => {
    const editor = editorRef.current?.getEditor();
    const delta = editor?.getContents();
    if (delta) {
      onChangeScript({
        target: { value: JSON.stringify(delta) },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [editorRef, onChangeScript]);

  // 초기값 설정
  useEffect(() => {
    if (data && editorRef.current) {
      const editor = editorRef.current.getEditor();
      try {
        const delta = JSON.parse(data.content);
        editor.setContents(delta);
      } catch (e) {
        console.error("Failed to parse delta", e);
      }
    }
  }, [data, editorRef]);

  return {
    editorRef,
    handleQuillChange,
  };
}

export const ScriptContext = createContext({} as ReturnType<typeof useScript>);
