"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import TextareaAutosize from "react-textarea-autosize";

export default function MCharacterModal() {
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
            <BirthAndGender />
            <DateAndButtonList />
          </div>
        </Modal>
      )}
    </>
  );
}

function CharacterName() {
  const { selectedMCharacter, onChangeSelectedMCharacterName, onKeyDownName } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <div>
      <p>인물 이름</p>
      <input
        className="memo-modal-name"
        defaultValue={selectedMCharacter.ch_name}
        onChange={onChangeSelectedMCharacterName}
        placeholder="인물의 이름을 입력하세요."
        onKeyDown={onKeyDownName}
      />
    </div>
  );
}

function CharacterImage() {
  const { selectedMCharacter } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
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
        {selectedMCharacter.ch_image && (
          <img
            src={selectedMCharacter.ch_image}
            alt={selectedMCharacter.ch_name}
          />
        )}
        {!selectedMCharacter.ch_image && <p>이미지가 없습니다.</p>}
      </div>
    </>
  );
}

function CharacterDescription() {
  const { selectedMCharacter, onChangeSelectedMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <>
      <p>인물 설명</p>
      <TextareaAutosize
        className="memo-modal-description"
        defaultValue={selectedMCharacter.description}
        onChange={onChangeSelectedMCharacterDescription}
        cacheMeasurements
        minRows={10}
        placeholder="인물에 대한 설명을 입력하세요"
      />
    </>
  );
}

function BirthAndGender() {
  const {
    selectedMCharacter,
    onChangeSelectedMCharacterBirthday,
    onChangeSelectedMCharacterGender,
  } = useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <div>
      <p>생년월일</p>
      <input
        className="memo-modal-birth"
        defaultValue={selectedMCharacter.birthday}
        onChange={onChangeSelectedMCharacterBirthday}
        placeholder="인물의 생년월일을 입력하세요."
      />
      <p>성별</p>
      <input
        className="memo-modal-gender"
        defaultValue={selectedMCharacter.gender}
        onChange={onChangeSelectedMCharacterGender}
        placeholder="인물의 성별을 입력하세요."
      />
    </div>
  );
}

function DateAndButtonList() {
  const { selectedMCharacter, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;
  const { onClickDeleteMCharacter } =
    useContext(DashboardContext).removeConfirmationModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <div>
      <div>
        {"수정일 : " +
          new Date(selectedMCharacter.updatedAt).toLocaleString("ko-KR", {
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
