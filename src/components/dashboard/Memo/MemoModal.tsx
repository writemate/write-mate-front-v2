"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  ModalContentAndFooterContainer,
  FooterContainer,
  TextArea,
} from "@/styles/dashboard/IdeaBox/Modal.style";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";
import { WarningModal } from "../WarningModal";
import { CloseButton, DeleteButton } from "@/styles/Button";
import { Title } from "@/styles/workspace";

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
    <Modal closeModal={closeEditModal} maxWidth="1024px" maxHeight="80vh">
      <ModalContentAndFooterContainer>
        <Title>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <input
              className="memo-modal-name"
              defaultValue={memo.memo_name}
              onChange={onChangeName}
              placeholder="메모 이름을 입력하세요"
              onKeyDown={onKeyDownTitle}
            />
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
            <CloseButton onClick={closeEditModal}>닫기</CloseButton>
          </div>
        </Title>
        <br />
        <TextArea
          className="memo-modal-description"
          defaultValue={memo.memo_description}
          onChange={onChangeDescription}
          cacheMeasurements
          minRows={10}
          placeholder="메모 내용을 입력하세요"
          style={{ boxShadow: "none", padding: "0", outline: "none" }}
        />
        <FooterContainer></FooterContainer>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
