import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import {
  CharacterListContainer,
  LoadingMessage,
} from "@/styles/workspace/Character.style";
import { CharacterCard } from "./CharacterCard";
import { useContext } from "react";

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
        <div>캐릭터 로딩중...</div>
      )}
      {!forInfoPage &&
        characterList &&
        keywordList &&
        characterList.map((character, index) => (
          <CharacterCard key={index} index={index} character={character} />
        ))}
      {!forInfoPage && characterList && characterList.length === 0 && (
        <LoadingMessage>인물이 없습니다. 인물을 생성해주세요.</LoadingMessage>
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
          <LoadingMessage>
            주요인물이 없습니다. 주요인물을 설정해주세요.
          </LoadingMessage>
        )}
    </CharacterListContainer>
  );
}
