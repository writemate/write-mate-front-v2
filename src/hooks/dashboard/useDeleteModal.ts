import { useState } from "react";

export default function useOpenAndCloseDeleteConfirmation() {
  const [selectedWorkForDelete, setSelectedWorkForDelete] = useState("");
  const [selectedMemoForDelete, setSelectedMemoForDelete] = useState("");
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

  return {
    selectedWorkForDelete,
    selectedMemoForDelete,
    isPermanentDelete,
    openDeleteModal,
    setSelectedWorkForDelete,
    setSelectedMemoForDelete,
    onPermanentDeleteWork,
    setOpenDeleteModal,
    setIsPermanentDelete,
    onClickMoveToTrash,
    onClickDeleteWork,
    onClickDeleteMemo,
  };
}
