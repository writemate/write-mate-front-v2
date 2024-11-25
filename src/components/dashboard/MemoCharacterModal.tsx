"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import TextareaAutosize from "react-textarea-autosize";

export default function MemoCharacterModal() {
  const { isOpenEditModal, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeEditModal} maxWidth="600px">
          <div style={{ background: "#ffffff" }}>
            <CharacterName />
            <CharacterImage />
            <CharacterDescription />
            <Footer />
          </div>
        </Modal>
      )}
    </>
  );
}

function CharacterName() {
  const {
    selectedMemoCharacter,
    onChangeSelectedMemoCharacterName,
    onKeyDownName,
  } = useContext(DashboardContext).memoCharacterModal;
  if (!selectedMemoCharacter) {
    return null;
  }

  return (
    <div>
      <p>인물 이름</p>
      <input
        className="memo-modal-name"
        defaultValue={selectedMemoCharacter.ch_name}
        onChange={onChangeSelectedMemoCharacterName}
        placeholder="인물의 이름을 입력하세요."
        onKeyDown={onKeyDownName}
      />
    </div>
  );
}

function CharacterImage() {
  const { selectedMemoCharacter } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMemoCharacter) {
    return null;
  }

  return (
    <>
      <p>인물 이미지</p>
      <input
        className="memo-modal-image"
        type="file"
        placeholder="인물 이미지 URL을 입력하세요."
      />
      <div>
        {selectedMemoCharacter.ch_image && (
          <img
            src={selectedMemoCharacter.ch_image}
            alt={selectedMemoCharacter.ch_name}
          />
        )}
        {!selectedMemoCharacter.ch_image && <p>이미지가 없습니다.</p>}
      </div>
    </>
  );
}

function CharacterDescription() {
  const { selectedMemoCharacter, onChangeSelectedMemoCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMemoCharacter) {
    return null;
  }

  return (
    <>
      <p>인물 설명</p>
      <TextareaAutosize
        className="memo-modal-description"
        defaultValue={selectedMemoCharacter.description}
        onChange={onChangeSelectedMemoCharacterDescription}
        cacheMeasurements
        minRows={10}
        placeholder="인물에 대한 설명을 입력하세요"
      />
    </>
  );
}

function Footer() {
  const { selectedMemoCharacter, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;
  const { onClickDeleteMCharacter } =
    useContext(DashboardContext).removeConfirmationModal;
  if (!selectedMemoCharacter) {
    return null;
  }

  return (
    <div>
      <div>
        {"수정일 : " +
          new Date(selectedMemoCharacter.updatedAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
      </div>
      <div>
        <button onClick={onClickDeleteMCharacter}>삭제</button>
        <button onClick={closeEditModal}>저장</button>
      </div>
    </div>
  );
}
