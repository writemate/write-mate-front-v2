"use client";
import { useRef } from "react";
import "react-quill/dist/quill.snow.css";
import { EditorWrapper, MainContainer } from "@/styles/workspace/Script.styles";
import CustomToolbar from "@/components/workspace/script/Toolbar";
import QuillEditor from "@/components/workspace/script/Editor";
import TextCount from "@/components/workspace/script/TextCount";
import { generagePlotAndCharacterByScriptMock } from "@/utils/APIs/mock/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useParams } from "next/navigation";

export default function Script() {
  const editorRef = useRef(null);
  const mainRef = useRef(null);

  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();

  const { mutate } = useMutation({
    mutationFn: generagePlotAndCharacterByScriptMock("",""),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: workspaceQueryKeys.all});
    }
  });

  return (
    <EditorWrapper>
      <CustomToolbar editorRef={editorRef} />
      <MainContainer ref={mainRef}>
        <QuillEditor innerRef={editorRef} MainRef={mainRef} />
      </MainContainer>
      <TextCount editorRef={editorRef}></TextCount>
      <button onClick={() => mutate()}>mock</button>
    </EditorWrapper>
  );
}
