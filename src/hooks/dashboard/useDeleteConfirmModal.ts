import { useState } from "react";

export default function useOpenAndCloseDeleteConfirmation() {
  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [selectedMemoForDelete, setSelectedMemoForDelete] = useState("");
  const [selectedMemoCharacterForDelete, setSelectedMemoCharacterForDelete] =
    useState("");
  const [isPermanentDelete, setIsPermanentDelete] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onPermanentDeleteWork = () => {
    setIsPermanentDelete(true);
  };
  const onClickMoveToTrash =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(false);
      setSelectedWorkForDelete(workId);
      setOpenDeleteModal(true);
    };

  const onClickDeleteWork =
    (workId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(true);
      setSelectedWorkForDelete(workId);
      setOpenDeleteModal(true);
    };

  const onClickDeleteMemo =
    (memoId: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(true);
      setSelectedMemoForDelete(memoId);
      setOpenDeleteModal(true);
    };

  const onClickDeleteMemoCharacter =
    (memoCharacterId: string) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setIsPermanentDelete(true);
      setSelectedMemoCharacterForDelete(memoCharacterId);
      setOpenDeleteModal(true);
    };

  return {
    selectedWorkForDelete,
    selectedMemoForDelete,
    selectedMemoCharacterForDelete,
    isPermanentDelete,
    openDeleteModal,
    onPermanentDeleteWork,
    setSelectedWorkForDelete,
    setSelectedMemoForDelete,
    setSelectedMemoCharacterForDelete,
    setOpenDeleteModal,
    setIsPermanentDelete,
    onClickMoveToTrash,
    onClickDeleteWork,
    onClickDeleteMemo,
    onClickDeleteMemoCharacter,
  };
}
