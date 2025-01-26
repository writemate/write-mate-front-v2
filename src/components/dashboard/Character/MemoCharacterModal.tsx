"use client";
import { useContext } from "react";

import Modal from "@/components/Modal";
import Image from "@/components/dashboard/Character/Image";
import BirthAndGender from "@/components/dashboard/Character/BirthAndGender";
import Description from "@/components/dashboard/Character/Description";
import Characteristic from "@/components/dashboard/Character/Characteristic";

import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";

import { ModalContentAndFooterContainer } from "@/styles/dashboard/IdeaBox/Modal.style";
import {
  CoverContainer,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import { WarningModal } from "../WarningModal";
import { CloseButton, DeleteButton } from "@/styles/Button";
import { Subtitle, Title } from "@/styles/workspace";

export default function MCharacterModal() {
  const {
    closeEditModal,
    isOpenDeleteModal,
    closeDeleteModal,
    onClickOpenDeleteModal,
    onDeleteMCharacter,
    deleteCharacteristic,
    character,
    onChangeName,
    onChangeRole,
  } = useContext(CharacterItemContext);

  return (
    <Modal closeModal={closeEditModal} maxWidth="1024px" maxHeight="80vh">
      <ModalContentAndFooterContainer>
        <Title>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <input
              className="name"
              defaultValue={character.ch_name}
              onChange={onChangeName}
              placeholder="인물의 이름을 입력하세요."
            />
            <DeleteButton onClick={onClickOpenDeleteModal()}>삭제</DeleteButton>
            {isOpenDeleteModal && deleteCharacteristic == -1 && (
              <WarningModal
                closeModal={closeDeleteModal}
                onClickConfirm={onDeleteMCharacter}
                onClickCancel={closeDeleteModal}
                message="정말로 삭제하시겠습니까?"
                ConfirmButtonName="삭제"
              />
            )}
            <CloseButton onClick={closeEditModal}>닫기</CloseButton>
          </div>
          <Subtitle>
            <input
              className="role"
              defaultValue={character.role}
              onChange={onChangeRole}
              placeholder="인물의 역할을 입력하세요."
            />
          </Subtitle>
        </Title>
        <CoverContainer>
          <Image />
          <CoverContentsContainer>
            <BirthAndGender />
            <Description />
          </CoverContentsContainer>
        </CoverContainer>
        <Characteristic />
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
