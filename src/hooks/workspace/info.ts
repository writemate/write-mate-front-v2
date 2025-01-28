import { useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getInfo,
  updateCoverImage,
  updateExpectedQuantity,
  updateGenre,
  updateIntroduction,
  updateLogline,
  updateTitle,
  updateGrade,
} from "@/utils/APIs/workspace";
import { useParams, useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import { useInputLiveUpdate } from "../common/useInputLiveUpdate";
import { useOnClickUpdate } from "../common/useOnClickUpdate";
import { notifySuccess } from "@/utils/showToast";

export function useInfo() {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.info(workspace_id),
    queryFn: getInfo(workspace_id),
  });

  const imageInputRef = useRef<HTMLInputElement>(null);

  const onChangeTitle = useInputLiveUpdate(
    updateTitle(workspace_id),
    "제목을 저장 중입니다.",
    "제목을 저장하는 중에 문제가 발생했습니다."
  );

  const onBlurTitle = () => {
    queryClient.invalidateQueries({
      queryKey: workspaceQueryKeys.workName(workspace_id),
    });
  };

  const onChangeLogline = useInputLiveUpdate(
    updateLogline(workspace_id),
    "로그라인을 저장 중입니다.",
    "로그라인을 저장하는 중에 문제가 발생했습니다."
  );

  const onChangeIntroduction = useInputLiveUpdate(
    updateIntroduction(workspace_id),
    "소개글을 저장 중입니다.",
    "소개글을 저장하는 중에 문제가 발생했습니다."
  );

  const onChangeGenre = useOnClickUpdate({
    mutationFn: updateGenre(workspace_id),
    queryKey: workspaceQueryKeys.info(workspace_id),
    savingMessage: "장르를 저장 중입니다.",
    errorMessage: "장르를 저장하는 중에 문제가 발생했습니다.",
    onSuccess: () => {
      notifySuccess("장르가 변경되었습니다.");
    },
  });

  const onChangeGrade = useOnClickUpdate({
    mutationFn: updateGrade(workspace_id),
    queryKey: workspaceQueryKeys.info(workspace_id),
    savingMessage: "등급을 저장 중입니다.",
    errorMessage: "등급을 저장하는 중에 문제가 발생했습니다.",
    onSuccess: () => {
      notifySuccess("등급이 변경되었습니다.");
    },
  });

  const onChangeExpectedQuantity = useInputLiveUpdate(
    updateExpectedQuantity(workspace_id),
    "예상 연재량을 저장 중입니다.",
    "예상 연재량을 저장하는 중에 문제가 발생했습니다."
  );

  // 커버 이미지 변경
  const mutateCoverImage = useOnClickUpdate({
    mutationFn: updateCoverImage(workspace_id),
    queryKey: workspaceQueryKeys.info(workspace_id),
    savingMessage: "커버 이미지 변경 중",
    errorMessage: "커버 이미지 변경에 실패했습니다.",
    onSuccess: () => {
      notifySuccess("작품 표지가 변경되었습니다.");
    },
    onMutate: (value: File) => {
      const prevData = queryClient.getQueryData([
        workspaceQueryKeys.info(workspace_id),
      ]);
      if (prevData) {
        queryClient.setQueryData(
          workspaceQueryKeys.info(workspace_id),
          (prev: any) => {
            return prev.map((work: any) => {
              if (work.id === workspace_id) {
                return { ...work, cover: URL.createObjectURL(value) };
              }
              return work;
            });
          }
        );
      }
      return { prevData };
    },
    onError: (error, variables, context) => {
      if (context?.prevData)
        queryClient.setQueryData(
          workspaceQueryKeys.info(workspace_id),
          context?.prevData
        );
    },
  });

  const onChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutateCoverImage(file)();
  };
  const onClickChangeCover = () => {
    imageInputRef.current?.click();
  };

  return {
    data,
    error,
    isLoading,
    imageInputRef,
    onBlurTitle,
    onChangeGrade,
    onChangeCoverImage,
    onChangeTitle,
    onChangeGenre,
    onChangeLogline,
    onChangeIntroduction,
    onChangeExpectedQuantity,
    onClickChangeCover,
  };
}

export const InfoContext = createContext({} as ReturnType<typeof useInfo>);
