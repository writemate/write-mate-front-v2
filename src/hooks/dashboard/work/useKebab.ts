import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { updateWorkCategory, updateWorkCover } from "@/utils/APIs/dashboard";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { workspaceCategory } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useRef, useState } from "react";

export function useKebab(workId: string) {
  const queryClient = useQueryClient();
  const [isKebabOpen, setIsKebabOpen] = useState(false);
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
    closeKebab();
  };

  // 작품명 변경
  const onClickChangeTitle =
    (titleRef: React.RefObject<HTMLInputElement>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      titleRef.current?.focus();
      console.log("Title input ref: ", titleRef);
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
    console.log("Image input ref222: ", imageInputRef);
    const file = e.target.files?.[0];
    if (!file) return;
    mutateCoverImage(file)();
  };
  const onClickChangeCover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Image input ref: ", imageInputRef);
    imageInputRef.current?.click();
  };

  // 카테고리 변경
  const mutateCategory = useOnClickUpdate({
    mutationFn: updateWorkCategory(workId),
    queryKey: ["workCategory", workId],
    onSuccess: () => {
      notifySuccess("카테고리가 변경되었습니다.");
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

  //

  return {
    isKebabOpen,
    imageInputRef,
    menuRef,
    onClickKebab,
    onBlurKebab,
    onClickChangeTitle,
    onChangeCoverImage,
    onClickChangeCover,
    onClickChangeCategory,
  };
}

export const KebabContext = createContext({} as ReturnType<typeof useKebab>);
