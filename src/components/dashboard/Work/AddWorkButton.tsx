"use client";

import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";

export function AddWork() {
  const { onClickAddWorkspace } =
    useContext(DashboardContext).workstudioAndTrash;

  return (
    <AddMemoButtonContainer onClick={onClickAddWorkspace}>
      새 작품 집필하기
    </AddMemoButtonContainer>
  );
}
export function MoveToOngoing() {
  const { onClickMoveToOngoing } =
    useContext(DashboardContext).workstudioAndTrash;

  return (
    <AddMemoButtonContainer onClick={onClickMoveToOngoing}>
      집필 중인 작품 보러가기
    </AddMemoButtonContainer>
  );
}
