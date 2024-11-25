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

export default function DeleteModal() {
  const {
    isOpenDeleteModal,
    selectedWorkForDelete,
    isDeleteMemo,
    isDeleteMemoCharacter,
    isPermanentDelete,
    closeConfirmModal,
  } = useContext(DashboardContext).removeConfirmationModal;

  return (
    <>
      {isOpenDeleteModal && (
        <Modal closeModal={closeConfirmModal} maxWidth="450px">
          <>
            {selectedWorkForDelete != "" && !isPermanentDelete && (
              <ConfirmMoveToTrash />
            )}
            {selectedWorkForDelete != "" && isPermanentDelete && (
              <ConfirmDeleteWorkInTrashModal />
            )}
            {isDeleteMemo && <ConfirmDeleteMemoModal />}
            {isDeleteMemoCharacter && <ConfirmDeleteMemoCharacterModal />}
          </>
        </Modal>
      )}
    </>
  );
}

function ConfirmMoveToTrash() {
  const { selectedWorkForDelete, closeConfirmModal } =
    useContext(DashboardContext).removeConfirmationModal;
  const { onChangeCategory } = useWork(selectedWorkForDelete);

  const onClickConfrimMove = () => {
    onChangeCategory("trash");
    closeConfirmModal();
  };
  const onClickCancel = () => {
    closeConfirmModal();
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

function ConfirmDeleteWorkInTrashModal() {
  const { closeConfirmModal } =
    useContext(DashboardContext).removeConfirmationModal;
  const { selectedWorkForDelete } =
    useContext(DashboardContext).removeConfirmationModal;
  const { onDeleteWork } = useWork(selectedWorkForDelete);

  const onClickConfirmDelete = () => {
    onDeleteWork();
    closeConfirmModal();
  };
  const onClickCancel = () => {
    closeConfirmModal();
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

function ConfirmDeleteMemoModal() {
  const { closeConfirmModal } =
    useContext(DashboardContext).removeConfirmationModal;
  const { onDeleteMemo, closeMemoModal } =
    useContext(DashboardContext).memoModal;

  const onClickConfirmDelete = () => {
    onDeleteMemo();
    closeConfirmModal();
    closeMemoModal();
  };
  const onClickCancel = () => {
    closeConfirmModal();
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

function ConfirmDeleteMemoCharacterModal() {
  const { closeConfirmModal } =
    useContext(DashboardContext).removeConfirmationModal;
  const { onDeleteMemo, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  const onClickConfirmDelete = () => {
    onDeleteMemo();
    closeConfirmModal();
    closeEditModal();
  };
  const onClickCancel = () => {
    closeConfirmModal();
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
