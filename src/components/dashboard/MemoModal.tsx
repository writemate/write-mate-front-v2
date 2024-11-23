"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import {
  MemoContent,
  MemoHeader,
  MemoTitle,
  MemoModalContainer,
  MemoUpdatedDate,
  MemoModalButtonContainer,
} from "@/styles/dashboard/MemoList";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

function Memo({ closeModal }: { closeModal: () => void }) {
  const {
    selectedMemo,
    onChangeSelectedMemoName,
    onChangeSelectedMemoDescription,
    onKeyDownTitle,
  } = useContext(DashboardContext).memoModal;
  const { onClickDeleteMemo } =
    useContext(DashboardContext).removeConfirmationModal;

  return (
    <>
      {selectedMemo && (
        <MemoModalContainer>
          <MemoUpdatedDate>
            {"수정 시각 :  " +
              new Date(selectedMemo.updatedAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </MemoUpdatedDate>
          <MemoHeader>
            <MemoTitle
              className="memo-modal-name"
              defaultValue={selectedMemo.memo_name}
              onChange={onChangeSelectedMemoName}
              placeholder="메모 이름을 입력하세요"
              onKeyDown={onKeyDownTitle}
            />
          </MemoHeader>
          <MemoContent
            className="memo-modal-description"
            defaultValue={selectedMemo.memo_description}
            onChange={onChangeSelectedMemoDescription}
            cacheMeasurements
            minRows={20}
            placeholder="메모 내용을 입력하세요"
          />
          <MemoModalButtonContainer>
            <button onClick={onClickDeleteMemo(selectedMemo.id)}>삭제</button>
            <button onClick={closeModal}>저장</button>
          </MemoModalButtonContainer>
        </MemoModalContainer>
      )}
    </>
  );
}

export default function MemoModal() {
  const { openEditModal, closeEditModal } =
    useContext(DashboardContext).memoModal;

  const closeModal = () => {
    closeEditModal();
  };

  return (
    <>
      {openEditModal && (
        <Modal closeModal={closeModal} maxWidth="600px">
          <Memo closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
