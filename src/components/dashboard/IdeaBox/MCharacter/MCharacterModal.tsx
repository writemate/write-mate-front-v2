"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import Footer from "@/components/dashboard/IdeaBox/MCharacter/ModalFooter";
import {
  ModalContentAndFooterContainer,
  ModalContentContainer,
  Input,
  AddCharacteristicButton,
  NameContainer,
  ImageContainer,
  BirthAndGenderContainer,
  CharacteristicContainer,
  ImgAndNameAndDescriptionContainer,
  NameAndDescriptionContainer,
  BirthContainer,
  GenderContainer,
  CharacteristicListContainer,
  Textarea,
  DescriptionContainer,
  RoleContainer,
  ImageButtonContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import Image from "@/components/dashboard/IdeaBox/MCharacter/Image";
import Name from "@/components/dashboard/IdeaBox/MCharacter/Name";
import BirthAndGender from "@/components/dashboard/IdeaBox/MCharacter/BirthAndGender";
import Role from "@/components/dashboard/IdeaBox/MCharacter/Role";
import Description from "@/components/dashboard/IdeaBox/MCharacter/Description";
import Characteristic from "@/components/dashboard/IdeaBox/MCharacter/Characteristic";

export default function MCharacterModal() {
  const { isOpenEditModal, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeEditModal} maxWidth="600px">
          <ModalContentAndFooterContainer>
            <ModalContentContainer>
              <ImgAndNameAndDescriptionContainer>
                <Image />
                <NameAndDescriptionContainer>
                  <Name />
                  <Role />
                </NameAndDescriptionContainer>
              </ImgAndNameAndDescriptionContainer>
              <BirthAndGender />
              <CharacterDescription />
              <Characterisitc />
            </ModalContentContainer>
            <ModalFooter />
          </ModalContentAndFooterContainer>
        </Modal>
      )}
    </>
  );
}

function Image() {
  const { selectedMCharacter } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <ImageContainer>
      <ImageButtonContainer>
        <input type="file" />
        <button>이미지 업로드</button>
      </ImageButtonContainer>
      {selectedMCharacter.ch_image && (
        <img
          src={selectedMCharacter.ch_image}
          alt={selectedMCharacter.ch_name}
        />
      )}
      {!selectedMCharacter.ch_image && selectedMCharacter.ch_name && (
        <p>{selectedMCharacter.ch_name[0]}</p>
      )}
    </ImageContainer>
  );
}

function Name() {
  const { selectedMCharacter, onChangeSelectedMCharacterName, onKeyDownName } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <NameContainer>
      <p>이름</p>
      <Input
        className="memo-modal-name"
        defaultValue={selectedMCharacter.ch_name}
        onChange={onChangeSelectedMCharacterName}
        placeholder="인물의 이름을 입력하세요."
      />
    </NameContainer>
  );
}

function Role() {
  const { selectedMCharacter, onChangeSelectedMCharacterRole } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <RoleContainer>
      <p>역할</p>
      <Input
        defaultValue={selectedMCharacter.role}
        onChange={onChangeSelectedMCharacterRole}
        placeholder="인물의 역할을 입력하세요."
      />
    </RoleContainer>
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
    <BirthAndGenderContainer>
      <BirthContainer>
        <p>생년월일</p>
        <Input
          className="memo-modal-birth"
          defaultValue={selectedMCharacter.birthday}
          onChange={onChangeSelectedMCharacterBirthday}
          placeholder="인물의 생년월일을 입력하세요."
        />
      </BirthContainer>
      <GenderContainer>
        <p>성별</p>
        <Input
          className="memo-modal-gender"
          defaultValue={selectedMCharacter.gender}
          onChange={onChangeSelectedMCharacterGender}
          placeholder="인물의 성별을 입력하세요."
        />
      </GenderContainer>
    </BirthAndGenderContainer>
  );
}

function CharacterDescription() {
  const { selectedMCharacter, onChangeSelectedMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <DescriptionContainer>
      <p>한줄 설명</p>
      <Textarea
        defaultValue={selectedMCharacter.description}
        onChange={onChangeSelectedMCharacterDescription}
        placeholder="인물의 설명을 입력하세요."
      />
    </DescriptionContainer>
  );
}

function Characterisitc() {
  const { selectedMCharacter, onClickAddCharacteristic } =
    useContext(DashboardContext).memoCharacterModal;
  if (selectedMCharacter.id === "") {
    return null;
  }

  return (
    <CharacteristicContainer>
      <p>설정</p>
      <CharacteristicListContainer>
        {selectedMCharacter.characteristic &&
          selectedMCharacter.characteristic.map((characteristic, index) => (
            <div key={index}>
              <input
                defaultValue={characteristic.title}
                placeholder="인물의 특징명을 입력하세요."
              />
              <button>삭제</button>
              <input
                defaultValue={characteristic.content}
                placeholder="인물의 특징을 입력하세요."
              />
            </div>
          ))}
        <AddCharacteristicButton onClick={onClickAddCharacteristic}>
          특징 추가
        </AddCharacteristicButton>
      </CharacteristicListContainer>
    </CharacteristicContainer>
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
