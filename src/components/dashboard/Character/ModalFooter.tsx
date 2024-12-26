"use client";
import { useContext } from "react";
import {
  DeleteButton,
  FooterContainer,
  SaveButton,
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
      <SaveButton onClick={closeEditModal}>저장</SaveButton>
    </FooterContainer>
  );
}
