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

function TrashContent({ closeModal }: { closeModal: () => void }) {
  const { selectedWorkForDelete } = useContext(DashboardContext).deleteModal;
  const { onChangeCategory } = useWork(selectedWorkForDelete);

  const handleDelete = () => {
    onChangeCategory("trash");
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        휴지통으로 옮기시겠습니까?
        <br />
        30일 뒤에 자동으로 삭제됩니다.
      </p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={handleDelete}>
          휴지통으로 옮기기
        </ModalButton>
        <ModalButton $isDanger={false} onClick={closeModal}>
          취소
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

function DeleteContent({ closeModal }: { closeModal: () => void }) {
  const { selectedWorkForDelete } = useContext(DashboardContext).deleteModal;
  const { onDeleteWork } = useWork(selectedWorkForDelete);

  const handleDelete = () => {
    onDeleteWork();
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        작품을 영구적으로 삭제하시겠습니까?
        <br />
        복구가 불가능합니다.
      </p>
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
  const {
    openDeleteModal,
    setOpenDeleteModal,
    setSelectedWorkForDelete,
    isPermanentDelete,
  } = useContext(DashboardContext).deleteModal;
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedWorkForDelete("");
  };

  return (
    <>
      {openDeleteModal && (
        <Modal closeModal={closeModal} maxWidth="600px" maxHeight="200px">
          <>
            {isPermanentDelete && <DeleteContent closeModal={closeModal} />}
            {!isPermanentDelete && <TrashContent closeModal={closeModal} />}
          </>
        </Modal>
      )}
    </>
  );
}
