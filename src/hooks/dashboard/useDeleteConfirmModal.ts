import { useState } from "react";

export default function useOpenAndCloseDeleteConfirmation() {
  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [selectedCharacteristicIdx, setSelectedCharacteristicIdx] =
    useState(-1);
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

  function openConfirmModalDeleteMCharacterCharacteristic(
    characteristicIdx: number
  ) {
    setSelectedCharacteristicIdx(characteristicIdx);
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

  const onClickDeleteMCharacterCharacteristic =
    (characteristicIdx: number) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      openConfirmModalDeleteMCharacterCharacteristic(characteristicIdx);
    };

  const onClickDeleteMCharacterCharacteristic =
    (characteristicIdx: number) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      openConfirmModalDeleteMCharacterCharacteristic(characteristicIdx);
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
    selectedCharacteristicIdx,
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
