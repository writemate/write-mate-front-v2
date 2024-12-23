'use client';
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import { ContentsContainer, KeywordTitle, SubTitle, OpenManagement,
  KeywordListContainer, KeywordContainer, KeywordListContainerForCharacterCard,
  CharacterListContainer, CharacterCard, CharacterCardTitle, CharacterImage,
  CharacterName, CharacterRole, CharacterDescription, CreateCharacterButton,
  MiniModal,
  InputWithButton
 } from "@/styles/workspace/Character.style";
import { Input } from "@/styles";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import AddButton from "@/assets/icons/addButton.svg";
import StarActive from "@/assets/workspace/character/starActive.svg";
import StarInactive from "@/assets/workspace/character/starInactive.svg";

export default function CharacterList() {
  const {
    workspace_id, keywordList, characterList, isKeywordsLoading, isCharactersLoading,
    addCharacter, isAddingCharacter, isAddingKeyword,
    selectKeyword, isSelectedKeyword, removeSelectedKeyword,
    setMainCharacter, removeMainCharacter,miniModalOpen,
    openMiniModal, miniKeywordInput, onChangeMiniKeywordInput,
    onEnterPressAtMiniModal, onClickAddKeywordAtMiniModal, onBlurredMiniModal,
    keywordListRef, addButtonRef, miniModalLeftPosition
  } = useCharacterList();
    
  return (
    <ContentsContainer>
      <KeywordTitle>
        <SubTitle>키워드로 찾기</SubTitle>
        <OpenManagement>키워드 관리</OpenManagement>
      </KeywordTitle>
      <KeywordListContainer ref={keywordListRef}>
        {isKeywordsLoading && <div>키워드 로딩중...</div>}
        {keywordList && keywordList.map((keyword, index) => (
          <KeywordContainer key={index} onClick={selectKeyword(keyword.id)}
            $lightColor={isSelectedKeyword(keyword.id) ? keyword.light_color : undefined}
            $darkColor={isSelectedKeyword(keyword.id) ? keyword.dark_color : undefined}
          >
            <span>{keyword.word}</span>
            {isSelectedKeyword(keyword.id) && <KeywordCancel onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              removeSelectedKeyword(keyword.id);
            }} />}
          </KeywordContainer>
        ))}
        <div style={{ position: 'relative' }} ref={addButtonRef}>
          <AddButton onClick={openMiniModal} />
          {miniModalOpen && (
          <MiniModal tabIndex={0} onBlur={onBlurredMiniModal} $left={miniModalLeftPosition}>
            <InputWithButton>
              <Input value={miniKeywordInput} onChange={onChangeMiniKeywordInput}
                onKeyDown={onEnterPressAtMiniModal} autoFocus placeholder="키워드 입력하기"
              />
              <button onMouseDown={onClickAddKeywordAtMiniModal}>추가</button>
            </InputWithButton>
          </MiniModal>
          )}
        </div>
      </KeywordListContainer>
      <CharacterListContainer>
        {(isKeywordsLoading || isCharactersLoading) && <div>캐릭터 로딩중...</div>}
        {characterList && keywordList && characterList.map((character, index) => (
          <CharacterCard key={index+1} href={`/${workspace_id}/character/${character.id}`}>
            <CharacterCardTitle>
              <CharacterImage $src={character.ch_image} />
              <div>
                <CharacterName>{character.ch_name}</CharacterName>
                <CharacterRole>{character.role}</CharacterRole>
              </div>
              {character.isMain && <StarActive onClick={removeMainCharacter(character.id)} />}
              {!character.isMain && <StarInactive onClick={setMainCharacter(character.id)} />}
            </CharacterCardTitle>
            <CharacterDescription>{character.description}</CharacterDescription>
            <KeywordListContainerForCharacterCard>
              {character.keyword.map((keyword, index) => {
                const isSelected = isSelectedKeyword(keyword.id);
                return (
                  <KeywordContainer key={index}
                    $lightColor={isSelected ? keyword.light_color : undefined}
                    $darkColor={isSelected ? keyword.dark_color : undefined}
                  >
                    <span>{keyword.word}</span>
                  </KeywordContainer>
                );
              })}
            </KeywordListContainerForCharacterCard>
          </CharacterCard>
        ))}
      </CharacterListContainer>
      <CreateCharacterButton onClick={()=>addCharacter()} disabled={isAddingCharacter || isAddingKeyword}>
        {isAddingCharacter&&"인물 생성중..."}
        {!isAddingCharacter && "인물 생성하기"}
      </CreateCharacterButton>
    </ContentsContainer>
  );
}
