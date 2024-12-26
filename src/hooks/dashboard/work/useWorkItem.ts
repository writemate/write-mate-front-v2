import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { updateWorkTitle } from "@/utils/APIs/dashboard";
import { useRef } from "react";

export function useWorkItem(workId: string) {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const onChangeTitle = useInputLiveUpdate(
    updateWorkTitle(workId),
    "작품 제목 변경",
    "작품 제목 변경에 실패하였습니다."
  );
  return { titleInputRef, onChangeTitle };
}
