"use Client";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { AddMCharacterButton } from "@/components/dashboard/AddButton";
import { CharacterListContainer } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList.style";
import { CharacterItem } from "./CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { Error, Loading } from "../Memo/MemoList";

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
        {characterList && characterList.length === 0 && (
          <LoadingMessage>캐릭터가 없습니다.</LoadingMessage>
        )}
      </CharacterListContainer>
      <AddMCharacterButton />
    </>
  );
}
