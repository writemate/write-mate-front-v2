import { useState } from "react";

export const useWarningModal = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const onOpenWarningModal = () => setIsOpenDeleteModal(true);
  const closeWarningModal = () => setIsOpenDeleteModal(false);

  return {
    isOpenDeleteModal,
    onOpenModal: onOpenWarningModal,
    closeModal: closeWarningModal,
    onOpenWarningModal,
    closeWarningModal,
  };
};
