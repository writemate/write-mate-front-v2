"use Client";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { AddMCharacterButton } from "@/components/dashboard/AddButton";
import { CharacterListContainer } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList.style";
import { CharacterItem } from "./CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { StateMessage } from "@/components/EmptyMessage";

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
        {error && <StateMessage messageKey="LOADING_ERROR" absolute />}
        {isLoading && <StateMessage messageKey="LOADING" absolute />}
        {characterList && characterList.length === 0 && (
          <StateMessage messageKey="CHARACTER_EMPTY" absolute />
        )}
      </CharacterListContainer>
      <AddMCharacterButton />
    </>
  );
}
