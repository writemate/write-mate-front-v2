'use client';
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import { ContentsContainer, KeywordTitle, SubTitle, OpenManagement,
  KeywordListContainer, KeywordContainer, KeywordListContainerForCharacterCard,
  CharacterListContainer, CharacterCard, CharacterCardTitle, CharacterImage,
  CharacterName, CharacterRole, CharacterDescription, CreateCharacterButton,
  MiniModal
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
        <div style={{ position: 'relative' }} ref={addButtonRef}>
          <AddButton onClick={openMiniModal} />
          {miniModalOpen && (
          <MiniModal tabIndex={0} onBlur={onBlurredMiniModal} $left={miniModalLeftPosition}>
            <Input value={miniKeywordInput} onChange={onChangeMiniKeywordInput}
              onKeyDown={onEnterPressAtMiniModal} autoFocus placeholder="키워드 입력하기"
            />
            <button onMouseDown={onClickAddKeywordAtMiniModal}>추가</button>
          </MiniModal>
          )}
        </div>
      </KeywordListContainer>
      <CharacterListContainer>
        {(isKeywordsLoading || isCharactersLoading) && <div>캐릭터 로딩중...</div>}
        {characterList && keywordList && characterList.map((character, index) => (
          <CharacterCard key={index+1} href={`/${workspace_id}/character/${character._id}`}>
            <CharacterCardTitle>
              <CharacterImage $src={character.ch_image??""} />
              <div>
                <CharacterName>{character.ch_name}</CharacterName>
                <CharacterRole>{character.role}</CharacterRole>
              </div>
              {character.isMain && <StarActive onClick={removeMainCharacter(character._id)} />}
              {!character.isMain && <StarInactive onClick={setMainCharacter(character._id)} />}
            </CharacterCardTitle>
            <CharacterDescription>{character.description}</CharacterDescription>
            <KeywordListContainerForCharacterCard>
              {character.keyword.map((id, index) => {
                const selectedKeyword = keywordList.find((k) => k._id === id)!;
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
      <CreateCharacterButton onClick={()=>addCharacter()} disabled={isAddingCharacter || isAddingKeyword}>
        {isAddingCharacter&&"인물 생성중..."}
        {!isAddingCharacter && "인물 생성하기"}
      </CreateCharacterButton>
    </ContentsContainer>
  );
}
