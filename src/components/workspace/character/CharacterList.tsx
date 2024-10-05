'use client';
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import { ButtonWithHoverAnimation } from "@/styles";
import { ContentsContainer, KeywordTitle, SubTitle, OpenManagement,
  KeywordListContainer, KeywordContainer, KeywordListContainerForCharacterCard,
  CharacterListContainer, CharacterCard, CharacterCardTitle, CharacterImage,
  CharacterName, CharacterRole, CharacterDescription
 } from "@/styles/workspace/Character.style";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import AddButton from "@/assets/workspace/character/addButton.svg";
import StarActive from "@/assets/workspace/character/starActive.svg";
import StarInactive from "@/assets/workspace/character/starInactive.svg";

export default function CharacterList() {
  const {
    keywordList, characterList, isKeywordsLoading, isCharactersLoading,
    addCharacter, addKeyword, isAddingCharacter, isAddingKeyword,
    selectKeyword, isSelectedKeyword, removeSelectedKeyword,
  } = useCharacterList();
    
  return (
    <ContentsContainer>
      <KeywordTitle>
        <SubTitle>키워드로 찾기</SubTitle>
        <OpenManagement>키워드 관리</OpenManagement>
      </KeywordTitle>
      <KeywordListContainer>
        {isKeywordsLoading && <div>키워드 로딩중...</div>}
        {keywordList && keywordList.map((keyword, index) => (
          <KeywordContainer key={index} onClick={selectKeyword(keyword._id)}
            $lightColor={isSelectedKeyword(keyword._id) ? keyword.lightColor : undefined}
            $darkColor={isSelectedKeyword(keyword._id) ? keyword.darkColor : undefined}
          >
            <span>{keyword.keyword_name}</span>
            {isSelectedKeyword(keyword._id) && <KeywordCancel onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              removeSelectedKeyword(keyword._id);
            }} />}
          </KeywordContainer>
        ))}
        <AddButton />
      </KeywordListContainer>
      <CharacterListContainer>
        {(isKeywordsLoading || isCharactersLoading) && <div>캐릭터 로딩중...</div>}
        {characterList && keywordList && characterList.map((character, index) => (
          <CharacterCard key={index+1}>
            <CharacterCardTitle>
              <CharacterImage $src={character.ch_image} />
              <div>
                <CharacterName>{character.ch_name}</CharacterName>
                <CharacterRole>{character.role}</CharacterRole>
              </div>
              {character.isMain && <StarActive />}
              {!character.isMain && <StarInactive />}
            </CharacterCardTitle>
            <CharacterDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores ea aliquam doloribus delectus est ipsam dolorum magni, ducimus rem quas reiciendis pariatur beatae? Sapiente, obcaecati optio asperiores quia voluptatum harum.</CharacterDescription>
            <KeywordListContainerForCharacterCard>
              {character.keyword.map((keyword, index) => {
                const selectedKeyword = keywordList.find((k) => k._id === keyword)!;
                const isSelected = isSelectedKeyword(selectedKeyword._id);
                return selectedKeyword && (
                  <KeywordContainer key={index}
                    $lightColor={isSelected ? selectedKeyword.lightColor : undefined}
                    $darkColor={isSelected ? selectedKeyword.darkColor : undefined}
                  >
                    <span>{selectedKeyword.keyword_name}</span>
                  </KeywordContainer>
                );
              })}
            </KeywordListContainerForCharacterCard>
          </CharacterCard>
        ))}
      </CharacterListContainer>
    </ContentsContainer>
  );
}
