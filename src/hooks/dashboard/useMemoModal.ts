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

export default function useMemoModal() {
  const queryClient = useQueryClient();

  const [openEditModal, setOpenEditModal] = useState(false);
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
    debounce(updateMemoNameMutation, 500),
    [selectedMemo]
  );
  const debounceUpdateMemoDescription = useCallback(
    debounce(updateMemoDescriptionMutation, 500),
    [selectedMemo]
  );

  const onClickMemoTitle = (memo: TMemo) => () => {
    setSelectedMemo(memo);
    focusInput(nameRef);
    setOpenEditModal(true);
  };
  const onClickMemoContent = (memo: TMemo) => () => {
    setSelectedMemo(memo);
    focusInput(descriptionRef);
    setOpenEditModal(true);
  };

  const onChangeSelectedMemoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMemo) {
      debounceUpdateMemoName({
        id: selectedMemo.id,
        memo_name: e.target.value,
      });
    }
    setSelectedMemo((old) =>
      old ? { ...old, memo_name: e.target.value } : null
    );
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
    setSelectedMemo((old) =>
      old ? { ...old, memo_description: e.target.value } : null
    );
  };

  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onClickDeleteMemo = () => {};

  function focusInput(ref: HTMLCollectionOf<Element>) {
    window.setTimeout(() => {
      if (ref.length > 0) (ref[0] as HTMLElement).focus();
    }, 0);
  }
  function closeEditModal() {
    setOpenEditModal(false);
    setSelectedMemo(null);
  }
  function openNewMemoEditModal() {
    const memoList = queryClient.getQueryData<TMemo[]>(
      memoQueryKeys.memoList()
    );
    if (!memoList) return;
    const memo = memoList[0];
    setSelectedMemo(memo);
    focusInput(descriptionRef);
    setOpenEditModal(true);
  }

  return {
    openEditModal,
    selectedMemo,
    onClickMemoTitle,
    onClickMemoContent,
    closeEditModal,
    onChangeSelectedMemoName,
    onChangeSelectedMemoDescription,
    onKeyDownTitle,
    openNewMemoEditModal,
  };
}
