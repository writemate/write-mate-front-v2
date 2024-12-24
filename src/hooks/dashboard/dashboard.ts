import { createContext, useState } from "react";
import useIdeaBoxMemo from "@/hooks/dashboard/useIdeaBoxMemo";
import useOpenAndCloseDeleteConfirmation from "./useDeleteConfirmModal";
import useMemoModal from "./useMemoModal";
import useIdeaBoxMemoCharacter from "./useIdeaBoxMCharacter";
import useMemoCharacterModal from "./useMCharacterModal";

export function useWorkCategory2() {
  const [isKebabMenuOpenWork, setIsKebabMenuOpenWork] = useState(""); // 어떤 케밥이 열려있는지 확인용
  const [isEditing, setIsEditing] = useState(""); // 어떤 작품이 수정중인지 확인용

  function handleKebabMenuOpenWork(work_id: string) {
    setIsKebabMenuOpenWork((prev) => (prev === work_id ? "" : work_id));
  }
  function handleEditing(work_id: string) {
    setIsEditing((prev) => (prev === work_id ? "" : work_id));
  }

  return {
    isEditing,
    isKebabMenuOpenWork,
    handleKebabMenuOpenWork,
    handleEditing,
  };
}

export const DashboardContext = createContext(
  {} as {
    workstudioAndTrash: ReturnType<typeof useWorkCategory2>;
    ideaBoxMemo: ReturnType<typeof useIdeaBoxMemo>;
    ideaBoxMCharacter: ReturnType<typeof useIdeaBoxMemoCharacter>;
    removeConfirmationModal: ReturnType<
      typeof useOpenAndCloseDeleteConfirmation
    >;
    memoModal: ReturnType<typeof useMemoModal>;
    memoCharacterModal: ReturnType<typeof useMemoCharacterModal>;
  }
);
