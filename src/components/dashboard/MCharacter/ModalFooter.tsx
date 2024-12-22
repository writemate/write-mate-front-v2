"use client";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { useContext } from "react";
import { CancelButton, DeleteButton, FooterContainer, SaveButton, RightButtonContainer } from "@/styles/dashboard/IdeaBox/Modal";

export default function ModalFooter() {
  const { closeEditModal, rollbackMCharacterAndCloseModal } = useContext(DashboardContext).memoCharacterModal;
  const { onClickDeleteMCharacter } = useContext(DashboardContext).removeConfirmationModal;
  return (
    <FooterContainer>
      <DeleteButton onClick={onClickDeleteMCharacter}>삭제</DeleteButton>
      <RightButtonContainer>
        <CancelButton onClick={rollbackMCharacterAndCloseModal}>취소</CancelButton>
        <SaveButton onClick={closeEditModal}>저장</SaveButton>
      </RightButtonContainer>
    </FooterContainer>
  );
}
