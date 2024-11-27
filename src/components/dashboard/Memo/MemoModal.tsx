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
  MemoModalBottom,
} from "@/styles/dashboard/Memo/MemoList";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

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
    closeMemoModal,
  } = useContext(DashboardContext).memoModal;
  const { onClickDeleteMemo } =
    useContext(DashboardContext).removeConfirmationModal;

  return (
    <>
      {selectedMemo && (
        <MemoModalContainer>
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
            minRows={10}
            placeholder="메모 내용을 입력하세요"
          />
          <MemoModalBottom>
            <MemoUpdatedDate>
              {"수정일 : " +
                new Date(selectedMemo.updatedAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </MemoUpdatedDate>
            <MemoModalButtonContainer>
              <button onClick={onClickDeleteMemo}>삭제</button>
              <button onClick={closeMemoModal}>저장</button>
            </MemoModalButtonContainer>
          </MemoModalBottom>
        </MemoModalContainer>
      )}
    </>
  );
}
