"use client";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { useMemoList } from "@/hooks/dashboard/memo/useMemoList";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";

export function AddMemoButton() {
  const { onClickAddMemo } = useMemoList();

  return (
    <AddMemoButtonContainer onClick={onClickAddMemo}>
      메모 추가
    </AddMemoButtonContainer>
  );
}

export function AddMCharacterButton() {
  const { onClickAddCharacter } = useCharacterList();

  return (
    <AddMemoButtonContainer onClick={onClickAddCharacter}>
      인물 메모 추가
    </AddMemoButtonContainer>
  );
}
