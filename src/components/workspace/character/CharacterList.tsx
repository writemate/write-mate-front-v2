'use client';
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import { CharacterListContainer, KeywordTitle, SubTitle, OpenManagement,
  KeywordListContainer, KeywordContainer
 } from "@/styles/workspace/Character.style";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import AddButton from "@/assets/workspace/character/addButton.svg";

export default function CharacterList() {
  const {
    keywordList, characterList, isKeywordsLoading, isCharactersLoading,
    addCharacter, addKeyword, isAddingCharacter, isAddingKeyword,
    selectKeyword, isSelectedKeyword, removeSelectedKeyword,
  } = useCharacterList();
    
  return (
    <CharacterListContainer>
      <KeywordTitle>
        <SubTitle>키워드로 찾기</SubTitle>
        <OpenManagement>키워드 관리</OpenManagement>
      </KeywordTitle>
      <KeywordListContainer>
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
    </CharacterListContainer>
  );
}
