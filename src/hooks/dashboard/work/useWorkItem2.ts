import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import {
  deleteWork,
  updateWorkCategory,
  updateWorkCover,
} from "@/utils/APIs/dashboard";
import { useContext, useEffect, useRef, useState } from "react";
import { TWork, workspaceCategory } from "@/utils/APIs/types";
import { notifySuccess, notifyError } from "@/utils/showToast";
import { DashboardContext } from "../dashboard";
import { WorkCategoryContext } from "./workCategory";
import { WorkListContext } from "./workList";

export default function useWork(workId: string) {
  const { workCategory } = useContext(WorkCategoryContext);
  const { workList } = useContext(WorkListContext);
  const { handleEditing, handleKebabMenuOpenWork } =
    useContext(DashboardContext).workstudioAndTrash;

  const queryClient = useQueryClient();
  const [work, setWork] = useState<TWork | undefined>(() =>
    workList?.find((work) => work.id === workId)
  );
  const [toBeCategory, setToBeCategory] = useState<
    keyof typeof workspaceCategory
  >(workspaceCategory.trash); // 이거 deleteModal에서 동작이 이상해서 trash로 설정해놓음

  let file: File | null = null;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const excludeButtonRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const { mutate: mutateCover } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      if (!file) return Promise.reject(new Error("File is undefined"));
      return updateWorkCover(work.id)(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifySuccess("커버가 변경되었습니다.");
    },
  });
  const { mutate: mutateCategory } = useMutation({
    mutationFn: async () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      console.log(toBeCategory);
      return updateWorkCategory(work.id)(toBeCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifySuccess("카테고리가 변경되었습니다.");
    },
  });
  const { mutate: onDeleteWork } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      return deleteWork(work.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
      notifyError("작품이 삭제되었습니다.");
    },
  });

  const onChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    file = e.target.files?.[0] || null;
    if (!file) return;
    mutateCover();
  };
  const onChangeCategory = (toBeCategory: keyof typeof workspaceCategory) => {
    setToBeCategory(toBeCategory);
    mutateCategory();
  };

  const onClickChangeTitle =
    (inputRef: React.RefObject<HTMLInputElement>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (work) {
        handleEditing(work.id);
        inputRef.current?.focus();
      }
    };
  const onClickChangeCover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    ref.current?.click();
  };
  const onClickChangeCategory =
    (category: keyof typeof workspaceCategory) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onChangeCategory(category);
    };

  const onClickChangeCoverInput = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
  };
  const onChangeCoverInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCover(event);
  };

  const handleClickOutside =
    (
      menuRef: React.RefObject<HTMLElement>,
      excludeButtonRef: React.RefObject<HTMLElement>
    ) =>
    (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        excludeButtonRef.current &&
        !excludeButtonRef.current.contains(event.target as Node)
      ) {
        handleKebabMenuOpenWork("");
      }
    };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside(menuRef, excludeButtonRef)
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside(menuRef, excludeButtonRef)
      );
    };
  }, []);
  return {
    ref,
    work,
    menuRef,
    excludeButtonRef,
    onChangeCover,
    onChangeCategory,
    onDeleteWork,
    onClickChangeCover,
    onClickChangeTitle,
    onClickChangeCategory,
    onClickChangeCoverInput,
    onChangeCoverInput,
  };
}
