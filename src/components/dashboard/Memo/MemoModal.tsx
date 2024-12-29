"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  TextArea,
  Input,
  ModalContentAndFooterContainer,
  ModalContentContainer,
  FooterContainer,
  DeleteButton,
  ModalHeader,
} from "@/styles/dashboard/IdeaBox/Modal";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";
import { WarningModal } from "../WarningModal";
import Close from "@/assets/icons/close.svg";

export function EditModal() {
  const {
    memo,
    isOpenDeleteModal,
    closeEditModal,
    closeDeleteModal,
    onKeyDownTitle,
    onDeleteMemo,
    onChangeName,
    onChangeDescription,
    onClickOpenDeleteModal,
  } = useContext(MemoItemContext);
  return (
    <Modal closeModal={closeEditModal} maxWidth="750px">
      <ModalContentAndFooterContainer>
        <ModalHeader>
          <p>메모</p>
          <Close onClick={closeEditModal} />
        </ModalHeader>

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
        <FooterContainer>
          <DeleteButton onClick={onClickOpenDeleteModal}>삭제</DeleteButton>
          {isOpenDeleteModal && (
            <WarningModal
              closeModal={closeDeleteModal}
              onClickConfirm={onDeleteMemo()}
              onClickCancel={closeDeleteModal}
              message="정말로 삭제하시겠습니까?"
              ConfirmButtonName="삭제"
            />
          )}
        </FooterContainer>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
