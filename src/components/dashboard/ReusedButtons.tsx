"use client";

<<<<<<<< HEAD:src/components/dashboard/Work/AddWorkButton.tsx
import { AddWorkspaceButton } from "@/styles/dashboard/Work/AddWorkButton";
========
import { AddWorkspaceButton } from "@/styles/dashboard/ReusedButtons";
>>>>>>>> dev:src/components/dashboard/ReusedButtons.tsx

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
