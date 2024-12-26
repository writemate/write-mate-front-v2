"use client";

import Modal from "@/components/Modal";
import {
  ButtonContainer,
  DangerIcon,
  ModalButton,
  ModalContainer,
} from "@/styles/WarningModal";

export function WarningModal({
  closeModal,
  onClickConfirm,
  message,
  ConfirmButtonName,
  onClickCancel,
}: {
  closeModal: () => void | ((e: React.MouseEvent<HTMLDivElement>) => void);
  onClickConfirm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  message: string;
  ConfirmButtonName: string;
}) {
  return (
    <Modal closeModal={closeModal} maxWidth="450px">
      <ModalContainer>
        <DangerIcon />
        <p>{message}</p>
        <ButtonContainer>
          <ModalButton $isDanger={true} onClick={onClickConfirm}>
            {ConfirmButtonName}
          </ModalButton>
          <ModalButton $isDanger={false} onClick={onClickCancel}>
            취소
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
}
