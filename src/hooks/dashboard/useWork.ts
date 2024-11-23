import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys, workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  deleteWork,
  updateWorkCategory,
  updateWorkCover,
  updateWorkTitle,
} from "@/utils/APIs/dashboard";
import { useContext, useRef, useState } from "react";
import { DashboardContext } from "./dashboard";
import { TWork, workspaceCategory } from "@/utils/APIs/types";
import { notifySuccess, notifyError } from "@/utils/showToast";

export function useWork(workId: string) {
  const { handleEditing, data, workCategory } =
    useContext(DashboardContext).dashboardData;

  const queryClient = useQueryClient();
  const [work, setWork] = useState<TWork | undefined>(() =>
    data?.find((work) => work.id === workId)
  );
  const [toBeCategory, setToBeCategory] = useState<
    keyof typeof workspaceCategory
  >(workspaceCategory.trash); // 이거 deleteModal에서 동작이 이상해서 trash로 설정해놓음

  let file: File | null = null;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const excludeButtonRef = useRef<HTMLDivElement | null>(null);

  const { mutate: mutateTitle } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      return updateWorkTitle(work.id)(work.title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), workCategory],
      });
    },
  });
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

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!work) return;
    setWork({
      ...work,
      title: e.target.value,
    });
  };
  const onBlurTitle = () => {
    if (!work) return;
    setWork({
      ...work,
    });
    mutateTitle();
    notifySuccess("제목이 변경되었습니다.");
    handleEditing("");
  };
  const onKeyDownTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!work) return;
    if (e.key === "Enter") {
      setWork({
        ...work,
      });
      mutateTitle();
      handleEditing("");
    }
  };
  const onChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    file = e.target.files?.[0] || null;
    if (!file) return;
    mutateCover();
  };
  const onChangeCategory = (toBeCategory: keyof typeof workspaceCategory) => {
    setToBeCategory(toBeCategory);
    mutateCategory();
  };

  return {
    work,
    menuRef,
    excludeButtonRef,
    onChangeTitle,
    onBlurTitle,
    onKeyDownTitle,
    onChangeCover,
    onChangeCategory,
    onDeleteWork,
  };
}
