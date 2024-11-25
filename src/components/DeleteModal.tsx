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

function ConfirmMoveToTrash({ closeModal }: { closeModal: () => void }) {
  const { selectedWorkForDelete } =
    useContext(DashboardContext).removeConfirmationModal;
  const { onChangeCategory } = useWork(selectedWorkForDelete);

  const onClickConfrimMove = () => {
    onChangeCategory("trash");
    closeModal();
  };
  const onClickCancel = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        해당 작품을 휴지통으로 옮기시겠습니까?
        <br />
        휴지통의 데이터는 보관 후 30일까지 보관됩니다.
      </p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={onClickConfrimMove}>
          휴지통으로 옮기기
        </ModalButton>
        <ModalButton $isDanger={false} onClick={onClickCancel}>
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

  const onClickConfirmDelete = () => {
    onDeleteWork();
    closeModal();
  };
  const onClickCancel = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        해당 작품를 삭제하시겠습니까?
        <br />
        삭제된 데이터는 복구가 어렵습니다.
      </p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={onClickConfirmDelete}>
          삭제
        </ModalButton>
        <ModalButton $isDanger={false} onClick={onClickCancel}>
          취소
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

function ConfirmDeleteMemoModal({ closeModal }: { closeModal: () => void }) {
  const { onDeleteMemo, closeEditModal } =
    useContext(DashboardContext).memoModal;

  const onClickConfirmDelete = () => {
    onDeleteMemo();
    closeEditModal();
    closeModal();
  };
  const onClickCancel = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        해당 메모를 삭제하시겠습니까?
        <br />
        삭제된 데이터는 복구가 어렵습니다.
      </p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={onClickConfirmDelete}>
          삭제
        </ModalButton>
        <ModalButton $isDanger={false} onClick={onClickCancel}>
          취소
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

function ConfirmDeleteMemoCharacterModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { onDeleteMemo } = useContext(DashboardContext).memoCharacterModal;

  const onClickConfirmDelete = () => {
    onDeleteMemo();
    closeModal();
  };
  const onClickCancel = () => {
    closeModal();
  };

  return (
    <ModalContainer>
      <DangerIcon />
      <p>
        해당 인물 메모를 삭제하시겠습니까?
        <br />
        삭제된 데이터는 복구가 어렵습니다.
      </p>
      <ButtonContainer>
        <ModalButton $isDanger={true} onClick={onClickConfirmDelete}>
          삭제
        </ModalButton>
        <ModalButton $isDanger={false} onClick={onClickCancel}>
          취소
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
}

export default function DeleteModal() {
  const {
    openDeleteModal,
    selectedWorkForDelete,
    selectedMemoForDelete,
    selectedMemoCharacterForDelete,
    setOpenDeleteModal,
    setSelectedWorkForDelete,
    setSelectedMemoForDelete,
    setSelectedMemoCharacterForDelete,
    isPermanentDelete,
  } = useContext(DashboardContext).removeConfirmationModal;

  const closeModal = () => {
    setOpenDeleteModal(false);
    setSelectedWorkForDelete("");
    setSelectedMemoForDelete("");
    setSelectedMemoCharacterForDelete("");
  };

  return (
    <>
      {openDeleteModal && (
        <Modal closeModal={closeModal} maxWidth="450px">
          <>
            {selectedWorkForDelete != "" && !isPermanentDelete && (
              <ConfirmMoveToTrash closeModal={closeModal} />
            )}
            {selectedWorkForDelete != "" && isPermanentDelete && (
              <ConfirmDeleteWorkInTrashModal closeModal={closeModal} />
            )}
            {selectedMemoForDelete != "" && (
              <ConfirmDeleteMemoModal closeModal={closeModal} />
            )}
            {selectedMemoCharacterForDelete != "" && (
              <ConfirmDeleteMemoCharacterModal closeModal={closeModal} />
            )}
          </>
        </Modal>
      )}
    </>
  );
}
