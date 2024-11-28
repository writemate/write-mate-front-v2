"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

export default function MCharacterModal() {
  const { isOpenEditModal, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeEditModal} maxWidth="600px">
          <div style={{ background: "#ffffff" }}>
            <CharacterImage />
            <CharacterName />
            <BirthAndGender />
            <Characterisitc />
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

function Characterisitc() {
  const { selectedMCharacter } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <>
      <p>특징</p>
      {selectedMCharacter.characteristic &&
        selectedMCharacter.characteristic.map((characteristic, index) => (
          <>
            <input
              key={index}
              defaultValue={characteristic.title}
              placeholder="인물의 특징명을 입력하세요."
            />
            <input
              key={index}
              defaultValue={characteristic.content}
              placeholder="인물의 특징을 입력하세요."
            />
          </>
        ))}
      <button>특징 추가</button>
    </>
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
