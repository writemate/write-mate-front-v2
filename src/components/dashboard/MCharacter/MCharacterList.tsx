"use Client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { useContext } from "react";
import { AddMCharacterButton } from "@/components/dashboard/AddButton";
import { CharacterListContainer } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList";
import { MemoItem } from "./MCharacterItem";

export default function CharacterList() {
  const { memoCharacterList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMCharacter;

  return (
    <CharacterListContainer>
      {error && <Error />}
      {isLoading && <Loading />}
      {memoCharacterList
        .slice()
        .reverse()
        .map((memo) => (
          <MemoItem key={memo.id} character={memo} />
        ))}
      <AddMCharacterButton />
    </CharacterListContainer>
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
