"use client";

import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import { WorkListContext } from "@/hooks/dashboard/work/workList";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";

export function AddWork() {
  const { onClickAddWork } = useContext(WorkListContext);

  return (
    <AddMemoButtonContainer onClick={onClickAddWork}>
      새 작품 집필하기
    </AddMemoButtonContainer>
  );
}
export function MoveToOngoing() {
  const { onClickRedirectToOngoingWork } = useContext(WorkCategoryContext);

  return (
    <AddMemoButtonContainer onClick={onClickRedirectToOngoingWork}>
      집필 중인 작품 보러가기
    </AddMemoButtonContainer>
  );
}
