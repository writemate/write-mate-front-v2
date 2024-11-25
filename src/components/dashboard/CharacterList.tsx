"use Client";

import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMemoButton } from "@/styles/dashboard/MemoCharacterList";
import { TMemoCharacter } from "@/utils/APIs/types";
import { useContext } from "react";

export default function CharacterList() {
  const { memoCharacterList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMemoCharacter;

  return (
    <div>
      {error && <Error />}
      {isLoading && <Loading />}
      {memoCharacterList
        .slice()
        .reverse()
        .map((memo) => (
          <MemoItem key={memo.id} character={memo} />
        ))}
      <AddMemo />
      {memoCharacterList.length === 0 && <AddMemo />}
    </div>
  );
}

interface MemoItemProps {
  character: TMemoCharacter;
}

function MemoItem({ character }: MemoItemProps) {
  const { onClickMemoCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <div onClick={onClickMemoCharacterDescription(character)}>
      {character.id}
    </div>
  );
}

function AddMemo() {
  const { memoCharacterList, getNewlyCreatedMemoCharacter } =
    useContext(DashboardContext).ideaBoxMemoCharacter;
  const { onClickMemoCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  const onClickAddMemo = async () => {
    const newMemo = await getNewlyCreatedMemoCharacter();
    if (!newMemo) return;
    onClickMemoCharacterDescription(newMemo)();
  };

  return (
    <AddMemoButton
      isEmpty={memoCharacterList.length === 0}
      onClick={onClickAddMemo}
    >
      인물 메모 추가
    </AddMemoButton>
  );
}

function Error() {
  return (
    <LoadingMessage>
      에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해 문의해주세요.
    </LoadingMessage>
  );
}

function Loading() {
  return <LoadingMessage>로딩 중...</LoadingMessage>;
}

function Creating() {
  return <LoadingMessage>메모를 생성하는 중...</LoadingMessage>;
}
