import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import { CharacterListContainer } from "@/styles/workspace/Character.style";
import { CharacterCard } from "./CharacterCard";
import { useContext } from "react";
import {
  LoadingMessage,
  RelativContainer,
} from "@/styles/dashboard/Loading.style";

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
        <RelativContainer>
          <LoadingMessage>인물이 없습니다. 인물을 생성해주세요.</LoadingMessage>
        </RelativContainer>
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
          <RelativContainer>
            <LoadingMessage>
              주요 등장인물이 없습니다. 주요 등장인물을 선택해주세요.
            </LoadingMessage>
          </RelativContainer>
        )}
    </CharacterListContainer>
  );
}
