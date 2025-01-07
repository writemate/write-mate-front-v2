import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import {
  CharacterListContainer,
  CharacterCard,
  CharacterCardTitle,
  CharacterImage,
  CharacterName,
  CharacterRole,
  CharacterDescription,
  KeywordListContainerForCharacterCard,
  KeywordContainer,
} from "@/styles/workspace/Character.style";
import StarActive from "@/assets/workspace/character/starActive.svg";
import StarInactive from "@/assets/workspace/character/starInactive.svg";
export function CharacterCardList() {
  const {
    workspace_id,
    keywordList,
    characterList,
    isKeywordsLoading,
    isCharactersLoading,
    isSelectedKeyword,
    onClickSetMainCharacter,
    onClickUnsetMainCharacter,
  } = useCharacterList();

  return (
    <CharacterListContainer>
      {(isKeywordsLoading || isCharactersLoading) && (
        <div>캐릭터 로딩중...</div>
      )}
      {characterList &&
        keywordList &&
        characterList.map((character, index) => (
          <CharacterCard
            key={index + 1}
            href={
              character.id === null
                ? "#"
                : `/${workspace_id}/character/${character.id}`
            }
          >
            <CharacterCardTitle>
              <CharacterImage $src={character.ch_image} />
              <div>
                <CharacterName $isNew={character.ch_name === ""}>
                  {character.ch_name}
                  {character.ch_name === "" && "새 인물"}
                </CharacterName>
                <CharacterRole>{character.role}</CharacterRole>
              </div>
              {character.isMain && (
                <StarActive onClick={onClickUnsetMainCharacter(character.id)} />
              )}
              {!character.isMain && (
                <StarInactive onClick={onClickSetMainCharacter(character.id)} />
              )}
            </CharacterCardTitle>
            <CharacterDescription $isNew={character.description === ""}>
              {character.description}
              {character.description === "" && "인물 설명을 적어주세요."}
            </CharacterDescription>
            <KeywordListContainerForCharacterCard>
              {character.keyword.map((keyword, index) => {
                const isSelected = isSelectedKeyword(keyword.id);
                return (
                  <KeywordContainer
                    key={index}
                    $lightColor={isSelected ? keyword.light_color : undefined}
                    $darkColor={isSelected ? keyword.dark_color : undefined}
                  >
                    <span>{keyword.word}</span>
                  </KeywordContainer>
                );
              })}
              {character.keyword.length === 0 && (
                <div style={{ color: "#B1B5C4" }}>키워드를 선택해주세요.</div>
              )}
            </KeywordListContainerForCharacterCard>
          </CharacterCard>
        ))}
    </CharacterListContainer>
  );
}
