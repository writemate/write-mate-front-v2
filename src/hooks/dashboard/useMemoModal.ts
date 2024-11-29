import { debounce } from "@/utils";
import {
  deleteMemo,
  updaetMemoName,
  updateMemoDescription,
} from "@/utils/APIs/memo";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { TMemo } from "@/utils/APIs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { notifySuccess, notifyWarning, notifyError } from "@/utils/showToast";

export default function useMemoModal() {
  const queryClient = useQueryClient();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<TMemo | null>(null);
  const nameRef = document.getElementsByClassName("memo-modal-name");
  const descriptionRef = document.getElementsByClassName(
    "memo-modal-description"
  );

  const { mutate: updateMemoNameMutation } = useMutation({
    mutationFn: updaetMemoName,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
    },
  });
  const { mutate: updateMemoDescriptionMutation } = useMutation({
    mutationFn: updateMemoDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
    },
  });
  const { mutate: deleteMemoMutation } = useMutation({
    mutationFn: deleteMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
    },
  });

  const debounceUpdateMemoName = useCallback(
    debounce(updateMemoNameMutation, 100),
    [selectedMemo]
  );
  const debounceUpdateMemoDescription = useCallback(
    debounce(updateMemoDescriptionMutation, 100),
    [selectedMemo]
  );

  const onClickMemoTitle = (memo: TMemo) => () => {
    setSelectedMemo(memo);
    focusInput(nameRef);
    setIsOpenEditModal(true);
  };
  const onClickMemoContent = (memo: TMemo) => () => {
    setSelectedMemo(memo);
    focusInput(descriptionRef);
    setIsOpenEditModal(true);
  };

  const onChangeSelectedMemoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMemo) {
      debounceUpdateMemoName({
        id: selectedMemo.id,
        memo_name: e.target.value,
      });
    }
  };
  const onChangeSelectedMemoDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (selectedMemo) {
      debounceUpdateMemoDescription({
        id: selectedMemo.id,
        memo_description: e.target.value,
      });
    }
  };

  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onDeleteMemo = () => {
    if (selectedMemo) {
      deleteMemoMutation(selectedMemo.id);
    }
  };

  function focusInput(ref: HTMLCollectionOf<Element>) {
    window.setTimeout(() => {
      if (ref.length > 0) (ref[0] as HTMLElement).focus();
    }, 0);
  }
  function closeMemoModal() {
    notifySuccess("변경사항이 저장되었습니다.");
    setIsOpenEditModal(false);
    setSelectedMemo(null);
  }
  function rollbackMemoAndCloseModal() {
    notifySuccess("변경사항이 저장되지 않았습니다.");
    if (selectedMemo) {
      debounceUpdateMemoName({
        id: selectedMemo.id,
        memo_name: selectedMemo.memo_name,
      });
      debounceUpdateMemoDescription({
        id: selectedMemo.id,
        memo_description: selectedMemo.memo_description,
      });
    }
    closeMemoModal();
  }
  return {
    isOpenEditModal,
    selectedMemo,
    onClickMemoTitle,
    onClickMemoContent,
    closeMemoModal,
    onChangeSelectedMemoName,
    onChangeSelectedMemoDescription,
    onKeyDownTitle,
    onDeleteMemo,
    rollbackMemoAndCloseModal,
  };
}
