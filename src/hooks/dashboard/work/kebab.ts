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
  const [isInputing, setIsInputing] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 케밥 클릭 시 메뉴 열기
  const onClickKebab = () => {
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
    if (event.relatedTarget === null && isInputing) {
      setIsInputing(false);
      return;
    }
    setIsOpenDeleteModal(false);
    closeKebab();
  };

  // 작품명 변경
  const onClickChangeTitle = () => {
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
    },
    onMutate: (value: File) => {
      const prevDataOngoing = queryClient.getQueryData([
        dashboardQueryKeys.workStudio(),
        "ongoing",
      ]);
      console.log(prevDataOngoing);
      const prevDataCompleted = queryClient.getQueryData([
        dashboardQueryKeys.workStudio(),
        "completed",
      ]);
      console.log(prevDataOngoing, 2);

      queryClient.setQueryData(
        [dashboardQueryKeys.workStudio(), "ongoing"],
        (prev: any) => {
          return prev.map((work: any) => {
            if (work.id === workId) {
              return { ...work, cover: URL.createObjectURL(value) };
            }
            return work;
          });
        }
      );
      console.log(prevDataOngoing, 3);

      queryClient.setQueryData(
        [dashboardQueryKeys.workStudio(), "completed"],
        (prev: any) => {
          return prev.map((work: any) => {
            if (work.id === workId) {
              return { ...work, cover: URL.createObjectURL(value) };
            }
            return work;
          });
        }
      );
      console.log(444);
      console.log(prevDataOngoing, 4);
      console.log(555);
      closeKebab();
      console.log(prevDataOngoing, 5);

      return { prevDataOngoing };
    },
    onError: (error, variables, context) => {
      console.log(context?.prevDataOngoing);
      queryClient.setQueryData(
        [dashboardQueryKeys.workStudio(), "ongoing"],
        context?.prevDataOngoing
      );
    },
  });

  const onChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutateCoverImage(file)();
  };
  const onClickChangeCover = () => {
    setIsInputing(true);
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
    (workCategory: keyof typeof workspaceCategory) => () => {
      mutateCategory(workCategory)();
      menuRef.current?.focus();
      closeKebab();
    };

  // 워닝 모달 띄우기
  const onClickOpenModal = () => {
    setIsOpenDeleteModal(true);
  };
  const closeModal = () => {
    setIsOpenDeleteModal(false);
    menuRef.current?.focus();
  };
  const onClickCancel = () => {
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
