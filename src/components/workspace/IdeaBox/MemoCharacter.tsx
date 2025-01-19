"use Client";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { CharacterItem } from "@/components/dashboard/Character/CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { Error, Loading } from "@/components/dashboard/Memo/MemoList";
import { AddButton } from "@/styles/workspace/IdeaBox.styles";

export default function CharacterList() {
  const { characterList, error, isLoading, onClickAddCharacter } =
    useCharacterList();

  return (
    <>
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
      <AddButton onClick={onClickAddCharacter} />
    </>
  );
}
