"use client";

import { AddWorkspaceButton } from "@/styles/dashboard/ColoredRoundButtons";

interface AddButtonProps {
  actfunction: () => void;
}

export function AddWork({ actfunction }: AddButtonProps) {
  return (
    <AddWorkspaceButton
      onClick={() => {
        actfunction();
      }}
    >
      새 작품 집필하기
    </AddWorkspaceButton>
  );
}
