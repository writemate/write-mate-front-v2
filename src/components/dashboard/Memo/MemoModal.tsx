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
  RightButtonContainer,
  SaveButton,
} from "@/styles/dashboard/IdeaBox/Modal";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";
import { WarningModal } from "../WarningModal";

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
    onClickCloseEditModal,
    onClickOpenDeleteModal,
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
          <RightButtonContainer>
            <SaveButton onClick={onClickCloseEditModal}>닫기</SaveButton>
          </RightButtonContainer>
        </FooterContainer>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
