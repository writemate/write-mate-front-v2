"use client";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { useContext } from "react";
import { CancelButton, DeleteButton, FooterContainer, SaveButton, RightButtonContainer } from "@/styles/dashboard/IdeaBox/Modal";

export function ModalFooter() {
  const { closeMemoModal, rollbackMemoAndCloseModal } = useContext(DashboardContext).memoModal;
  const { onClickDeleteMemo } = useContext(DashboardContext).removeConfirmationModal;
  return (
    <FooterContainer>
      <DeleteButton onClick={onClickDeleteMemo}>삭제</DeleteButton>
      <RightButtonContainer>
        <CancelButton onClick={rollbackMemoAndCloseModal}>취소</CancelButton>
        <SaveButton onClick={closeMemoModal}>저장</SaveButton>
      </RightButtonContainer>
    </FooterContainer>
  );
}
