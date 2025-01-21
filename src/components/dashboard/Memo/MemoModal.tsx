"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  TextArea,
  Input,
  ModalContentAndFooterContainer,
  FooterContainer,
  ModalTitle,
  FlexRowDiv,
} from "@/styles/dashboard/IdeaBox/Modal.style";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";
import { WarningModal } from "../WarningModal";
import { SubTitle } from "@/styles/workspace/Info.style";
import { CloseButton } from "@/styles";
import { DeleteButton } from "@/styles/Button";

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
        <ModalTitle>
          <SubTitle>메모</SubTitle>
          <CloseButton
            onClick={closeEditModal}
            style={{ marginLeft: "auto" }}
          />
        </ModalTitle>
        <FlexRowDiv>
          <Input
            className="memo-modal-name"
            defaultValue={memo.memo_name}
            onChange={onChangeName}
            placeholder="메모 이름을 입력하세요"
            onKeyDown={onKeyDownTitle}
          />
          <DeleteButton
            onClick={onClickOpenDeleteModal}
            style={{
              marginLeft: "auto",
              marginBottom: "auto",
              marginTop: "16px",
            }}
          >
            삭제하기
          </DeleteButton>
          {isOpenDeleteModal && (
            <WarningModal
              closeModal={closeDeleteModal}
              onClickConfirm={onDeleteMemo()}
              onClickCancel={closeDeleteModal}
              message="정말로 삭제하시겠습니까?"
              ConfirmButtonName="삭제"
            />
          )}
        </FlexRowDiv>
        <TextArea
          className="memo-modal-description"
          defaultValue={memo.memo_description}
          onChange={onChangeDescription}
          cacheMeasurements
          minRows={10}
          placeholder="메모 내용을 입력하세요"
        />
        <FooterContainer></FooterContainer>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
