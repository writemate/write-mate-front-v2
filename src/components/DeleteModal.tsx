"use client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  ButtonContainer,
  DangerIcon,
  ModalButton,
  ModalContainer,
} from "@/styles/DeleteModal";
import { useContext } from "react";
import useWork from "@/hooks/dashboard/useWork";
import Modal from "@/components/Modal";
import useMemoModal from "@/hooks/dashboard/useMemoModal";

function ConfirmMoveToTrash({ closeModal }: { closeModal: () => void }) {
  const { selectedWorkForDelete } =
    useContext(DashboardContext).removeConfirmationModal;
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

function ConfirmDeleteWorkInTrashModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { selectedWorkForDelete } =
    useContext(DashboardContext).removeConfirmationModal;
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

function ConfirmDeleteMemoModal({ closeModal }: { closeModal: () => void }) {
  const { selectedMemo } = useContext(DashboardContext).memoModal;
  const { onDeleteMemo } = useMemoModal(selectedMemo.id);

  const handleDelete = () => {
    onDeleteMemo();
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        메모를 삭제하시겠습니까?
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
  } = useContext(DashboardContext).removeConfirmationModal;
  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedWorkForDelete("");
  };

  return (
    <>
      {openDeleteModal && (
        <Modal closeModal={closeModal} maxWidth="600px" maxHeight="200px">
          <>
            {isPermanentDelete && (
              <ConfirmDeleteWorkInTrashModal closeModal={closeModal} />
            )}
            {!isPermanentDelete && (
              <ConfirmMoveToTrash closeModal={closeModal} />
            )}
          </>
        </Modal>
      )}
    </>
  );
}
