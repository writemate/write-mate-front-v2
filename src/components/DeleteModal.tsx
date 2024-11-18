"use client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  ButtonContainer,
  DangerIcon,
  ModalButton,
  ModalContainer,
} from "@/styles/DeleteModal";
import { useContext } from "react";
import { useWork } from "@/hooks/dashboard/useWork";
import Modal from "@/components/Modal";

function DeleteModalContent({ closeModal }: { closeModal: () => void }) {
  const { isDeleting } = useContext(DashboardContext);
  const { onChangeCategory } = useWork(isDeleting);

  const handleDelete = () => {
    onChangeCategory("trash");
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>정말 삭제하시겠습니까?</p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={handleDelete}>
          삭제
        </ModalButton>
        <ModalButton $isDanger={false} onClick={closeModal}>
          취소
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default function DeleteModal() {
  const { openDeleteModal, setOpenDeleteModal, setIsDeleting } =
    useContext(DashboardContext);

  const closeModal = () => {
    setOpenDeleteModal(false);
    setIsDeleting("");
  };

  return (
    <>
      {openDeleteModal && (
        <Modal closeModal={closeModal} maxWidth="600px" maxHeight="200px">
          <DeleteModalContent closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}
