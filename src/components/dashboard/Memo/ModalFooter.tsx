"use client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { useContext } from "react";
import {
  DeleteButton,
  FooterContainer,
  SaveButton,
  RightButtonContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import { MemoItemContext } from "@/hooks/dashboard/memo/memoItem";

export function ModalFooter() {
  const { onClickCloseModal } = useContext(MemoItemContext);

  const { onClickDeleteMemo } =
    useContext(DashboardContext).removeConfirmationModal;
  return (
    <FooterContainer>
      <DeleteButton onClick={onClickDeleteMemo}>삭제</DeleteButton>
      <RightButtonContainer>
        <SaveButton onClick={onClickCloseModal}>닫기</SaveButton>
      </RightButtonContainer>
    </FooterContainer>
  );
}
