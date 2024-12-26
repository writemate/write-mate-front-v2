import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { updateMemoDescription, updateMemoName } from "@/utils/APIs/memo";
import { TMemo } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { createContext, useState } from "react";

export function useMemoItem(memo: TMemo) {
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

  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  const onChangeName = useInputLiveUpdate(
    updateMemoName(memo.id),
    "메모 이름 변경",
    "메모 이름 변경에 실패하였습니다."
  );

  const onChangeDescription = useInputLiveUpdate(
    updateMemoDescription(memo.id),
    "메모 내용 변경",
    "메모 내용 변경에 실패하였습니다."
  );

  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onClickCloseModal = () => {
    notifySuccess("메모가 저장되었습니다.");
    closeEditModal();
  };

  return {
    memo,
    isOpenEditModal,
    closeEditModal,
    onClickMemoTitle,
    onClickMemoContent,
    onChangeName,
    onChangeDescription,
    onKeyDownTitle,
    onClickCloseModal,
  };
}

export const MemoItemContext = createContext(
  {} as ReturnType<typeof useMemoItem>
);

function focusInput(ref: HTMLCollectionOf<Element>) {
  window.setTimeout(() => {
    if (ref.length > 0) (ref[0] as HTMLElement).focus();
  }, 0);
}
