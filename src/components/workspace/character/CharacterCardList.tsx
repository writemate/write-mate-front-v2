import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import { CharacterListContainer } from "@/styles/workspace/Character.style";
import { CharacterCard } from "./CharacterCard";
import { useContext } from "react";
import { StateMessage } from "@/components/EmptyMessage";

interface CharacterCardListProps {
  forInfoPage?: boolean;
}

export function CharacterCardList({
  forInfoPage = false,
}: CharacterCardListProps) {
  const { keywordList, characterList, isKeywordsLoading, isCharactersLoading } =
    useContext(CharacterListContext);

  return (
    <CharacterListContainer $forInfoPage={forInfoPage}>
      {(isKeywordsLoading || isCharactersLoading) && (
        <StateMessage messageKey="LOADING" absolute />
      )}
      {!forInfoPage &&
        characterList &&
        keywordList &&
        characterList.map((character, index) => (
          <CharacterCard key={index} index={index} character={character} />
        ))}
      {!forInfoPage && characterList && characterList.length === 0 && (
        <StateMessage messageKey="CHARACTER_EMPTY" absolute />
      )}
      {forInfoPage &&
        characterList &&
        keywordList &&
        characterList.map(
          (character, index) =>
            character.isMain && (
              <CharacterCard key={index} index={index} character={character} />
            )
        )}
      {forInfoPage &&
        characterList &&
        characterList.filter((character) => character.isMain).length === 0 && (
          <StateMessage messageKey="MAIN_CHARACTER_EMPTY" absolute />
        )}
    </CharacterListContainer>
  );
}
