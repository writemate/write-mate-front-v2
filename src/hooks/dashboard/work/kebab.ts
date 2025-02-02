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
import { createContext, useContext, useRef, useState } from "react";
import { WorkCategoryContext } from "./workCategory";

export function useKebab(
  workId: string,
  titleInputRef: React.RefObject<HTMLInputElement>
) {
  const queryClient = useQueryClient();
  const { workCategory } = useContext(WorkCategoryContext);

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
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.workStudio(workCategory)
      );
      if (prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          (prev: any) => {
            return prev.map((work: any) => {
              if (work.id === workId) {
                return { ...work, cover: URL.createObjectURL(value) };
              }
              return work;
            });
          }
        );
      }
      closeKebab();
      return { prevData };
    },
    onError: (error, variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          context.prevData
        );
      }
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
    queryKey: dashboardQueryKeys.allWorkStudio(),
    onSuccess: () => {
      notifySuccess("작품의 카테고리가 변경되었습니다.");
    },
    savingMessage: "카테고리 변경 중",
    errorMessage: "카테고리 변경에 실패했습니다.",
    onMutate: (value: keyof typeof workspaceCategory) => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.workStudio(workCategory)
      );
      if (prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          (prev: any) => {
            return prev.filter((work: any) => work.id !== workId);
          }
        );
      }
      return { prevData };
    },
    onError: (error, variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          context.prevData
        );
      }
    },
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
    queryKey: dashboardQueryKeys.workStudio(workCategory),
    onSuccess: () => {
      notifySuccess("작품이 삭제되었습니다.");
    },
    savingMessage: "작품 삭제 중",
    errorMessage: "작품 삭제에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.workStudio(workCategory)
      );
      if (prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          (prev: any) => {
            return prev.filter((work: any) => work.id !== workId);
          }
        );
      }
      return { prevData };
    },
    onError: (error, variables, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          dashboardQueryKeys.workStudio(workCategory),
          context.prevData
        );
      }
    },
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
