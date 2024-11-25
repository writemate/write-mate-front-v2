"use Client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMemoButton } from "@/styles/dashboard/MCharacterList";
import { TMCharacter } from "@/utils/APIs/types";
import { useContext } from "react";

export default function CharacterList() {
  const { memoCharacterList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMCharacter;

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
  character: TMCharacter;
}

function MemoItem({ character }: MemoItemProps) {
  const { onClickMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <div onClick={onClickMCharacterDescription(character)}>{character.id}</div>
  );
}

function AddMemo() {
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
    <AddMemoButton
      $isEmpty={memoCharacterList.length === 0}
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
