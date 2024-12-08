import { useState } from "react";

export default function useOpenAndCloseDeleteConfirmation() {
  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);
  const [isDeleteMemo, setIsDeleteMemo] = useState(false);
  const [isDeleteMemoCharacter, setIsDeleteMemoCharacter] = useState(false);
  const [
    isDeleteMCharacterCharacteristic,
    setIsDeleteMCharacterCharacteristic,
  ] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  function openDeleteConfirmModal() {
    setIsOpenDeleteModal(true);
  }

  function openConfirmModalMoveToTrash(workId: string) {
    setSelectedWorkForDelete(workId);
    openDeleteConfirmModal();
  }

  function openConfirmModalDeleteWork(workId: string) {
    setIsPermanentDelete(true);
    setSelectedWorkForDelete(workId);
    openDeleteConfirmModal();
  }

  function openConfirmModalDeleteMemo() {
    setIsDeleteMemo(true);
    openDeleteConfirmModal();
  }

  function openConfirmModalDeleteMCharacter() {
    setIsDeleteMemoCharacter(true);
    openDeleteConfirmModal();
  }

  function openConfirmModalDeleteMCharacterCharacteristic() {
    setIsDeleteMCharacterCharacteristic(true);
    openDeleteConfirmModal();
  }

  const onClickMoveToTrash =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      openConfirmModalMoveToTrash(workId);
    };

  const onClickDeleteWork =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      openConfirmModalDeleteWork(workId);
    };

  const onClickDeleteMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openConfirmModalDeleteMemo();
  };

  const onClickDeleteMCharacter = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    openConfirmModalDeleteMCharacter();
  };

  const onClickDeleteMCharacterCharacteristic = () => {
    openConfirmModalDeleteMCharacterCharacteristic();
  };

  const closeConfirmModal = () => {
    setIsOpenDeleteModal(false);
    setSelectedWorkForDelete("");
    setIsPermanentDelete(false);
    setIsDeleteMemo(false);
    setIsDeleteMemoCharacter(false);
    setIsDeleteMCharacterCharacteristic(false);
  };

  return {
    selectedWorkForDelete,
    isDeleteMemo,
    isDeleteMemoCharacter,
    isPermanentDelete,
    isOpenDeleteModal,
    isDeleteMCharacterCharacteristic,
    onClickMoveToTrash,
    onClickDeleteWork,
    onClickDeleteMemo,
    onClickDeleteMCharacter,
    onClickDeleteMCharacterCharacteristic,
    closeConfirmModal,
  };
}
