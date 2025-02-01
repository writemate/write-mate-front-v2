"use Client";
import { CharacterItem } from "@/components/dashboard/Character/CharacterItem";
import { useCharacterList } from "@/hooks/dashboard/character/useCharacterList";
import { AddButton } from "@/styles/workspace/IdeaBox.styles";
import { StateMessage } from "@/components/EmptyMessage";
import { CharacterCard } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList.style";

export default function CharacterList() {
  const { characterList, error, isLoading, onClickAddCharacter } =
    useCharacterList();

  return (
    <>
      <CharacterCard
        onClick={onClickAddCharacter}
        style={{
          border: "1px solid black",
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          flexShrink: 0,
        }}
      >
        <AddButton />
      </CharacterCard>
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
    </>
  );
}
