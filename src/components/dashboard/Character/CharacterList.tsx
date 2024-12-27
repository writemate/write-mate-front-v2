"use Client";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMCharacterButton } from "@/components/dashboard/AddButton";
import { CharacterListContainer } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList";
import { CharacterItem } from "./CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";

export default function CharacterList() {
  const { characterList, error, isLoading } = useCharacterList();

  return (
    <>
      <CharacterListContainer>
        {Array.isArray(characterList) &&
          characterList
            .slice()
            .reverse()
            .map((character) => (
              <CharacterItem key={character.id} character={character} />
            ))}
        {error && <Error />}
        {isLoading && <Loading />}
      </CharacterListContainer>
      <AddMCharacterButton />
    </>
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
