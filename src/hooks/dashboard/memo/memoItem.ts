import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import {
  deleteMemo,
  updateMemoDescription,
  updateMemoName,
} from "@/utils/APIs/memo";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { TMemo } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";

export function useMemoItem(memo: TMemo) {
  const queryClient = useQueryClient();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
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
    queryClient.invalidateQueries({
      queryKey: [dashboardQueryKeys.memo()],
    });
    setIsOpenEditModal(false);
  };

  const onChangeName = useInputLiveUpdate(
    updateMemoName(memo.id ?? ""),
    "메모 이름 변경",
    "메모 이름 변경에 실패하였습니다."
  );

  const onChangeDescription = useInputLiveUpdate(
    updateMemoDescription(memo.id ?? ""),
    "메모 내용 변경",
    "메모 내용 변경에 실패하였습니다."
  );

  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onClickOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const onDeleteMemo = useOnClickUpdate({
    mutationFn: deleteMemo(memo.id ?? ""),
    queryKey: dashboardQueryKeys.memo(),
    savingMessage: "메모 삭제 중",
    errorMessage: "메모 삭제에 실패하였습니다.",
    onMutate: () => {
      closeEditModal();
      closeDeleteModal();
      const prevData = queryClient.getQueryData(dashboardQueryKeys.memo());
      queryClient.setQueryData(dashboardQueryKeys.memo(), (oldData: any[]) => {
        return oldData.filter((item) => item.id !== memo.id);
      });
      return { prevData };
    },
    onError: (error, newMemo, context) => {
      queryClient.setQueryData([dashboardQueryKeys.memo()], context?.prevData);
    },
    onSuccess: () => {
      notifySuccess("메모가 삭제되었습니다.");
    },
  });

  const onClickCloseEditModal = () => {
    notifySuccess("메모가 저장되었습니다.");
    closeEditModal();
  };

  return {
    memo,
    isOpenEditModal,
    isOpenDeleteModal,
    closeEditModal,
    closeDeleteModal,
    onKeyDownTitle,
    onClickCloseEditModal,
    onClickMemoTitle,
    onClickMemoContent,
    onClickOpenDeleteModal,
    onChangeName,
    onChangeDescription,
    onDeleteMemo,
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
