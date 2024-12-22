"use client";

import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import { WorkListContext } from "@/hooks/dashboard/work/workList";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";

export function AddWork() {
  const { onAddWorkClick } = useContext(WorkListContext);

  return (
    <AddMemoButtonContainer onClick={onAddWorkClick}>
      새 작품 집필하기
    </AddMemoButtonContainer>
  );
}
export function MoveToOngoing() {
  const { onRedirectToOngoingWorkClick } = useContext(WorkCategoryContext);

  return (
    <AddMemoButtonContainer onClick={onRedirectToOngoingWorkClick}>
      집필 중인 작품 보러가기
    </AddMemoButtonContainer>
  );
}
