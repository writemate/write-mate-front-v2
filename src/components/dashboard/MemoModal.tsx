"use client";
import { useContext } from "react";
import Modal from "@/components/Modal";
import {
  MemoContent,
  MemoHeader,
  MemoTitle,
  MemoModalContainer,
} from "@/styles/dashboard/MemoList";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

function Memo({ closeModal }: { closeModal: () => void }) {
  const {
    selectedMemo,
    onChangeSelectedMemoName,
    onChangeSelectedMemoDescription,
    onKeyDownTitle,
  } = useContext(DashboardContext).memoModal;

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
            minRows={20}
            placeholder="메모 내용을 입력하세요"
          />
          <div>
            <button>삭제</button>
            <button onClick={closeModal}>닫기</button>
          </div>
        </MemoModalContainer>
      )}
    </>
  );
}

export default function DeleteModal() {
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
