"use client";

import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";

interface AddButtonProps {
  actfunction: () => void;
}

export function AddWork({ actfunction }: AddButtonProps) {
  return (
    <AddMemoButtonContainer
      onClick={() => {
        actfunction();
      }}
    >
      새 작품 집필하기
    </AddMemoButtonContainer>
  );
}
