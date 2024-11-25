import { useState } from "react";

export default function useOpenAndCloseDeleteConfirmation() {
  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);
  const [isDeleteMemo, setIsDeleteMemo] = useState(false);
  const [isDeleteMemoCharacter, setIsDeleteMemoCharacter] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const onClickMoveToTrash =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(false);
      setSelectedWorkForDelete(workId);
      setIsOpenDeleteModal(true);
    };

  const onClickDeleteWork =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(true);
      setSelectedWorkForDelete(workId);
      setIsOpenDeleteModal(true);
    };

  const onClickDeleteMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsPermanentDelete(true);
    setIsDeleteMemo(true);
    setIsOpenDeleteModal(true);
  };

  const onClickDeleteMCharacter = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsPermanentDelete(true);
    setIsDeleteMemoCharacter(true);
    setIsOpenDeleteModal(true);
  };

  const closeConfirmModal = () => {
    setIsOpenDeleteModal(false);
    setSelectedWorkForDelete("");
    setIsPermanentDelete(false);
    setIsDeleteMemo(false);
    setIsDeleteMemoCharacter(false);
  };

  return {
    selectedWorkForDelete,
    isDeleteMemo,
    isDeleteMemoCharacter,
    isPermanentDelete,
    isOpenDeleteModal,
    onClickMoveToTrash,
    onClickDeleteWork,
    onClickDeleteMemo,
    onClickDeleteMCharacter,
    closeConfirmModal,
  };
}
