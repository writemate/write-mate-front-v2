"use client";

import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";

export function AddMemoButton() {
  const { memoList, getNewlyCreatedMemo } =
    useContext(DashboardContext).ideaBoxMemo;
  const { onClickMemoContent } = useContext(DashboardContext).memoModal;
  const onClickAddMemo = async () => {
    const newMemo = await getNewlyCreatedMemo();
    if (!newMemo) return;
    onClickMemoContent(newMemo)();
  };
  return (
    <AddMemoButtonContainer
      $isEmpty={memoList.length === 0}
      onClick={onClickAddMemo}
    >
      메모 추가
    </AddMemoButtonContainer>
  );
}

export function AddMCharacterButton() {
  const { memoCharacterList, getNewlyCreatedMCharacter } =
    useContext(DashboardContext).ideaBoxMCharacter;
  const { onClickMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  const onClickAddMemo = async () => {
    const newMemo = await getNewlyCreatedMCharacter();
    if (!newMemo) return;
    onClickMCharacterDescription(newMemo)();
  };

  return (
    <AddMemoButtonContainer
      $isEmpty={memoCharacterList.length === 0}
      onClick={onClickAddMemo}
    >
      인물 메모 추가
    </AddMemoButtonContainer>
  );
}
