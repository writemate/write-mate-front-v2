import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import {
  deleteWork,
  updateWorkCategory,
  updateWorkCover,
} from "@/utils/APIs/dashboard";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { workspaceCategory } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useRef, useState } from "react";

export function useKebab(
  workId: string,
  titleInputRef: React.RefObject<HTMLInputElement>
) {
  const queryClient = useQueryClient();

  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 케밥 클릭 시 메뉴 열기
  const onClickKebab = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsKebabOpen((prev) => !prev);
  };

  // 케밥 메뉴 닫기
  const closeKebab = () => {
    setIsKebabOpen(false);
  };

  // 케밥 메뉴 외부 클릭 시 닫기
  const onBlurKebab = (event: React.FocusEvent<HTMLDivElement>) => {
    if (menuRef.current && menuRef.current.contains(event.relatedTarget)) {
      return;
    }
    setIsOpenDeleteModal(false);
    closeKebab();
  };

  // 작품명 변경
  const onClickChangeTitle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    titleInputRef.current?.focus();
  };

  // 커버 이미지 변경
  const mutateCoverImage = useOnClickUpdate({
    mutationFn: updateWorkCover(workId),
    queryKey: ["workCover", workId],
    savingMessage: "커버 이미지 변경 중",
    errorMessage: "커버 이미지 변경에 실패했습니다.",
    onSuccess: () => {
      notifySuccess("작품 표지가 변경되었습니다.");
      closeKebab();
    },
  });
  const onChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutateCoverImage(file)();
  };
  const onClickChangeCover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    imageInputRef.current?.click();
  };

  // 카테고리 변경
  const mutateCategory = useOnClickUpdate({
    mutationFn: updateWorkCategory(workId),
    queryKey: ["workCategory", workId],
    onSuccess: () => {
      notifySuccess("작품의 카테고리가 변경되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), "ongoing"],
      });
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), "completed"],
      });
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), "trash"],
      });
    },
    savingMessage: "카테고리 변경 중",
    errorMessage: "카테고리 변경에 실패했습니다.",
  });
  const onClickChangeCategory =
    (workCategory: keyof typeof workspaceCategory) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      mutateCategory(workCategory)();
      closeKebab();
    };

  // 워닝 모달 띄우기
  const onClickOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpenDeleteModal(true);
  };
  const closeModal = () => {
    setIsOpenDeleteModal(false);
  };
  const onClickCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeKebab();
    closeModal();
  };

  // 삭제하기
  const onDeleteWork = useOnClickUpdate({
    mutationFn: deleteWork(workId),
    queryKey: [dashboardQueryKeys.workStudio(), "trash"],
    onSuccess: () => {
      notifySuccess("작품이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), "trash"],
      });
    },
    savingMessage: "작품 삭제 중",
    errorMessage: "작품 삭제에 실패했습니다.",
  });

  return {
    isKebabOpen,
    isOpenDeleteModal,
    imageInputRef,
    menuRef,
    closeModal,
    onBlurKebab,
    onClickKebab,
    onClickChangeTitle,
    onClickChangeCover,
    onClickChangeCategory,
    onClickOpenModal,
    onClickCancel,
    onChangeCoverImage,
    onDeleteWork,
  };
}

export const KebabContext = createContext({} as ReturnType<typeof useKebab>);
