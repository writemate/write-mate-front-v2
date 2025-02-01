"use Client";
import { AddMCharacterButton } from "@/components/dashboard/AddButton";
import { CharacterItem } from "./CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { StateMessage } from "@/components/EmptyMessage";
import { MemoListContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";

export default function CharacterList() {
  const { characterList, error, isLoading } = useCharacterList();

  return (
    <>
      <MemoListContainer>
        {characterList &&
          characterList
            .slice()
            .reverse()
            .map((character) => (
              <CharacterItem key={character.id} character={character} />
            ))}
        {error && <StateMessage messageKey="LOADING_ERROR" absolute />}
        {isLoading && <StateMessage messageKey="LOADING" absolute />}
        {characterList && characterList.length === 0 && (
          <StateMessage messageKey="CHARACTER_EMPTY" absolute />
        )}
      </MemoListContainer>
      <AddMCharacterButton />
    </>
  );
}
