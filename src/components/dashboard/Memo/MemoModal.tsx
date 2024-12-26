"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  TextArea,
  Input,
  ModalContentAndFooterContainer,
  ModalContentContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import { ModalFooter } from "@/components/dashboard/Memo/ModalFooter";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";

export function EditModal() {
  const {
    memo,
    closeEditModal,
    onChangeName,
    onChangeDescription,
    onKeyDownTitle,
  } = useContext(MemoItemContext);
  return (
    <Modal closeModal={closeEditModal} maxWidth="600px">
      <ModalContentAndFooterContainer>
        <ModalContentContainer>
          <p>제목</p>
          <Input
            className="memo-modal-name"
            defaultValue={memo.memo_name}
            onChange={onChangeName}
            placeholder="메모 이름을 입력하세요"
            onKeyDown={onKeyDownTitle}
          />
          <p>내용</p>
          <TextArea
            className="memo-modal-description"
            defaultValue={memo.memo_description}
            onChange={onChangeDescription}
            cacheMeasurements
            minRows={10}
            placeholder="메모 내용을 입력하세요"
          />
        </ModalContentContainer>
        <ModalFooter />
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
