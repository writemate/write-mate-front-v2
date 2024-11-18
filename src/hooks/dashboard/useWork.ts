import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys, workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  deleteWork,
  updateWorkCategory,
  updateWorkCover,
  updateWorkTitle,
} from "@/utils/APIs/dashboard";
import { useContext, useEffect, useRef, useState } from "react";
import { DashboardContext } from "./dashboard";
import { TWork, workspaceCategory } from "@/utils/APIs/types";

export function useWork(workId: string) {
  const { handleEditing, data, refetch } = useContext(DashboardContext);

  const queryClient = useQueryClient();

  const [work, setWork] = useState<TWork | undefined>(() =>
    data?.find((work) => work.id === workId)
  );

  // workId 또는 data 변경 시 work 상태 업데이트
  useEffect(() => {
    if (workId) {
      const foundWork = data?.find((work) => work.id === workId);
      setWork(foundWork); // work가 없으면 undefined로 설정
    }
  }, [workId, data]);

  // 케밥 메뉴 클릭 onBlur를 제어하기 위한 ref
  const menuRef = useRef<HTMLDivElement | null>(null);
  const excludeButtonRef = useRef<HTMLDivElement | null>(null);

  // 작품 제목 변경
  const { mutate: mutateTitle } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      return updateWorkTitle(work.id)(work.title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), work?.id],
      });
      refetch();
    },
  });

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!work) return;

    const newTitle = e.target.value.trim();

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

  // 작품 이미지 변경
  let file: File | null = null;
  const { mutate: mutateCover } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      if (!file) return Promise.reject(new Error("File is undefined"));
      return updateWorkCover(work.id)(file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), work?.id],
      });
      refetch();
    },
  });

  const onChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    file = e.target.files?.[0] || null;
    if (!file) return;
    mutateCover();
  };

  // 작품 카테고리 변경
  const [toBeCategory, setToBeCategory] = useState<
    keyof typeof workspaceCategory
  >(workspaceCategory.before);
  const { mutate: mutateCategory } = useMutation({
    mutationFn: async () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      return updateWorkCategory(work.id)(toBeCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), work?.id],
      });
      refetch();
    },
  });

  const onChangeCategory = (toBeCategory: keyof typeof workspaceCategory) => {
    setToBeCategory(toBeCategory);
    mutateCategory();
  };

  // 작품 삭제
  const { mutate: onDeleteWork } = useMutation({
    mutationFn: () => {
      if (!work) return Promise.reject(new Error("Work is undefined"));
      return deleteWork(work.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.workStudio(), work?.id],
      });
      refetch();
    },
  });

  return {
    onChangeTitle,
    onBlurTitle,
    onKeyDownTitle,
    menuRef,
    excludeButtonRef,
    onChangeCover,
    onChangeCategory,
    work,
    onDeleteWork,
  };
}
