"use client";
import { useContext } from "react";
import {
  CancelButton,
  DeleteButton,
  FooterContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { WarningModal } from "../WarningModal";

export default function ModalFooter() {
  const {
    closeEditModal,
    onClickOpenDeleteModal,
    isOpenDeleteModal,
    deleteCharacteristic,
    closeDeleteModal,
    onDeleteMCharacter,
  } = useContext(CharacterItemContext);

  return (
    <FooterContainer>
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
      <CancelButton onClick={closeEditModal}>닫기</CancelButton>
    </FooterContainer>
  );
}
