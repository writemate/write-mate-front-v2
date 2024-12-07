"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  Textarea,
  Input,
  ModalContentAndFooterContainer,
  ModalContentContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { ModalFooter } from "@/components/dashboard/IdeaBox/MemoModalFooter";

export default function MemoModal() {
  const { isOpenEditModal, closeMemoModal } =
    useContext(DashboardContext).memoModal;
  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeMemoModal} maxWidth="600px">
          <Memo />
        </Modal>
      )}
    </>
  );
}

function Memo() {
  const {
    selectedMemo,
    onChangeSelectedMemoName,
    onChangeSelectedMemoDescription,
    onKeyDownTitle,
  } = useContext(DashboardContext).memoModal;

  return (
    <>
      {selectedMemo && (
        <ModalContentAndFooterContainer>
          <ModalContentContainer>
            <p>제목</p>
            <Input
              className="memo-modal-name"
              defaultValue={selectedMemo.memo_name}
              onChange={onChangeSelectedMemoName}
              placeholder="메모 이름을 입력하세요"
              onKeyDown={onKeyDownTitle}
            />
            <p>내용</p>
            <Textarea
              className="memo-modal-description"
              defaultValue={selectedMemo.memo_description}
              onChange={onChangeSelectedMemoDescription}
              cacheMeasurements
              minRows={10}
              placeholder="메모 내용을 입력하세요"
            />
          </ModalContentContainer>
          <ModalFooter />
        </ModalContentAndFooterContainer>
      )}
    </>
  );
}
