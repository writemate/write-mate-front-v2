"use client";
import { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { EditorWrapper, MainContainer } from "@/styles/workspace/Script.styles";
import CustomToolbar from "@/components/workspace/script/Toolbar";
import QuillEditor from "@/components/workspace/script/Editor";
import TextCount from "@/components/workspace/script/TextCount";
import { generagePlotAndCharacterByScriptMock } from "@/utils/APIs/mock/workspace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal";
import { styled, keyframes } from "styled-components";
import Link from "next/link";

const AIResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  padding: 30px;
  border-radius: 12px;
  gap: 16px;
  &>h1 {
    margin-bottom: 16px;
  }
`;

const Loading = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${Loading} 2s linear infinite;
`;

const LinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 200px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.orange500};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 12px;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.color.red600};
  }
`;

export const Button = styled.div`
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.orange500};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 12px;
  transition: 0.3s;
  position: fixed;
  bottom: 30px;
  right: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.color.red600};
  }
`;

export default function Script() {
  const editorRef = useRef(null);
  const mainRef = useRef(null);

  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();

  const { mutateAsync } = useMutation({
    mutationFn: generagePlotAndCharacterByScriptMock("",""),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: workspaceQueryKeys.all});
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [newPlotId, setNewPlotId] = useState<string | null>(null);
  const isPending = newPlotId === null;
  const onClick = async () => {
    setModalOpen(true);
    const newPlotId = await mutateAsync();
    setNewPlotId(newPlotId);
  }
  const closeModal = () => {
    setModalOpen(false);
    setNewPlotId(null);
  }

  return (
    <EditorWrapper>
      <CustomToolbar editorRef={editorRef} />
      <MainContainer ref={mainRef}>
        <QuillEditor innerRef={editorRef} MainRef={mainRef} />
      </MainContainer>
      <TextCount editorRef={editorRef}></TextCount>
      <Button onClick={onClick}>정리하기</Button>
      {modalOpen && <Modal closeModal={closeModal} maxWidth={800} maxHeight={600}>
        <AIResultContainer>
          {isPending && <LoadingIcon/>}
          {!isPending && <h1>원고 분석이 완료되었습니다.</h1>}
          {!isPending && <LinkButton href={`/${workspace_id}/plot/${newPlotId}`}>플롯 보러가기</LinkButton>}
          {!isPending && <LinkButton href={`/${workspace_id}/character`}>캐릭터 보러가기</LinkButton>}
        </AIResultContainer>
      </Modal>}
    </EditorWrapper>
  );
}
