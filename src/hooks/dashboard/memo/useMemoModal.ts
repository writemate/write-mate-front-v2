import { useState } from "react";

export function useMemoModal(memoId: string) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const nameRef = document.getElementsByClassName("memo-modal-name");
  const descriptionRef = document.getElementsByClassName(
    "memo-modal-description"
  );

  const onClickMemoTitle = () => {
    focusInput(nameRef);
    setIsOpenEditModal(true);
  };

  const onClickMemoContent = () => {
    focusInput(descriptionRef);
    setIsOpenEditModal(true);
  };

  return {
    isOpenEditModal,
    onClickMemoTitle,
    onClickMemoContent,
  };
}

function focusInput(ref: HTMLCollectionOf<Element>) {
  window.setTimeout(() => {
    if (ref.length > 0) (ref[0] as HTMLElement).focus();
  }, 0);
}
