"use client";
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import {
  ContentsContainer,
  KeywordTitle,
  SubTitle,
  OpenManagement,
  KeywordListContainer,
  KeywordContainer,
  KeywordListContainerForCharacterCard,
  CharacterListContainer,
  CharacterCard,
  CharacterCardTitle,
  CharacterImage,
  CharacterName,
  CharacterRole,
  CharacterDescription,
  CreateCharacterButton,
  MiniModal,
  InputWithButton,
  ManageKeywordContainer,
  ManageRowWrapper,
  ManageKeywordLeft,
  VerticalLine,
  ManageKeywordRight,
  SelectColorContainer,
  SelectableColor,
  RandomColor,
  CreateKeywordButton,
} from "@/styles/workspace/Character.style";
import { Input } from "@/styles";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import AddButton from "@/assets/icons/addButton.svg";
import StarActive from "@/assets/workspace/character/starActive.svg";
import StarInactive from "@/assets/workspace/character/starInactive.svg";
import Modal from "@/components/Modal";
import { Title } from "@/styles/workspace";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";

export default function CharacterList() {
  const {
    workspace_id,
    keywordList,
    characterList,
    isKeywordsLoading,
    isCharactersLoading,
    onClickAddCharacter,
    selectKeyword,
    isSelectedKeyword,
    removeSelectedKeyword,
    onClickSetMainCharacter,
    onClickUnsetMainCharacter,
    miniModalOpen,
    openMiniModal,
    miniKeywordInput,
    onChangeMiniKeywordInput,
    onEnterPressAtMiniModal,
    onClickAddKeywordAtMiniModal,
    onBlurredMiniModal,
    keywordListRef,
    addButtonRef,
    miniModalLeftPosition,
    isModalOpen,
    openModal,
    closeModal,
    selectedColor,
    selectColor,
    selectRandom,
    modalInput,
    onChangeModalInput,
    onClickCreateKeyword,
    onClickDeleteKeyword,
  } = useCharacterList();

  return (
    <ContentsContainer>
      <KeywordTitle>
        <SubTitle>키워드로 찾기</SubTitle>
        <OpenManagement onClick={openModal}>키워드 관리</OpenManagement>
        {isModalOpen && (
          <Modal closeModal={closeModal} maxWidth={800} maxHeight={326}>
            <ManageKeywordContainer>
              <Title>키워드 관리</Title>
              <ManageRowWrapper>
                <ManageKeywordLeft>
                  <span>키워드 입력</span>
                  <InputWithButton>
                    <Input
                      value={modalInput}
                      onChange={onChangeModalInput}
                      autoFocus
                      placeholder="키워드 입력하기"
                    />
                  </InputWithButton>
                  <span style={{ marginTop: 14 }}>색상 선택</span>
                  <SelectColorContainer>
                    <RandomColor
                      onClick={selectRandom}
                      $isSelected={selectedColor === null}
                    />
                    <SelectableColor
                      onClick={selectColor("red")}
                      $color="red"
                      $isSelected={selectedColor === "red"}
                    />
                    <SelectableColor
                      onClick={selectColor("orange")}
                      $color="orange"
                      $isSelected={selectedColor === "orange"}
                    />
                    <SelectableColor
                      onClick={selectColor("yellow")}
                      $color="darkYellow"
                      $isSelected={selectedColor === "yellow"}
                    />
                    <SelectableColor
                      onClick={selectColor("green")}
                      $color="green"
                      $isSelected={selectedColor === "green"}
                    />
                    <SelectableColor
                      onClick={selectColor("blue")}
                      $color="blue"
                      $isSelected={selectedColor === "blue"}
                    />
                    <SelectableColor
                      onClick={selectColor("purple")}
                      $color="purple"
                      $isSelected={selectedColor === "purple"}
                    />
                  </SelectColorContainer>
                  <CreateKeywordButton
                    onClick={onClickCreateKeyword}
                    disabled={modalInput.trim() === ""}
                  >
                    키워드 생성
                  </CreateKeywordButton>
                </ManageKeywordLeft>
                <VerticalLine />
                <ManageKeywordRight>
                  <span>전체 키워드</span>
                  <KeywordListContainer>
                    {keywordList &&
                      keywordList.map((keyword, index) => (
                        <KeywordContainer
                          key={index}
                          $lightColor={keyword.light_color}
                          $darkColor={keyword.dark_color}
                        >
                          <span>{keyword.word}</span>
                          <KeywordCancel
                            onClick={onClickDeleteKeyword(keyword.id)}
                          />
                        </KeywordContainer>
                      ))}
                  </KeywordListContainer>
                </ManageKeywordRight>
              </ManageRowWrapper>
            </ManageKeywordContainer>
          </Modal>
        )}
      </KeywordTitle>
      <KeywordListContainer ref={keywordListRef}>
        {isKeywordsLoading && <div>키워드 로딩중...</div>}
        {keywordList &&
          keywordList.map((keyword, index) => {
            if (keyword.id === null)
              return (
                <KeywordContainer key={index}>
                  <span>{keyword.word}</span>
                </KeywordContainer>
              );
            return (
              <KeywordContainer
                key={index}
                onClick={selectKeyword(keyword.id)}
                $lightColor={
                  isSelectedKeyword(keyword.id)
                    ? keyword.light_color
                    : undefined
                }
                $darkColor={
                  isSelectedKeyword(keyword.id) ? keyword.dark_color : undefined
                }
              >
                <span>{keyword.word}</span>
                {isSelectedKeyword(keyword.id) && (
                  <KeywordCancel
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      removeSelectedKeyword(keyword.id);
                    }}
                  />
                )}
              </KeywordContainer>
            );
          })}
        <div
          style={{ position: "relative", display: "flex" }}
          ref={addButtonRef}
        >
          <AddButton onClick={openMiniModal} />
          {miniModalOpen && (
            <MiniModal
              tabIndex={0}
              onBlur={onBlurredMiniModal}
              $left={miniModalLeftPosition}
            >
              <InputWithButton>
                <Input
                  value={miniKeywordInput}
                  onChange={onChangeMiniKeywordInput}
                  onKeyDown={onEnterPressAtMiniModal}
                  autoFocus
                  placeholder="키워드 입력하기"
                />
                <button onMouseDown={onClickAddKeywordAtMiniModal}>추가</button>
              </InputWithButton>
            </MiniModal>
          )}
        </div>
      </KeywordListContainer>
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
                  <StarActive
                    onClick={onClickUnsetMainCharacter(character.id)}
                  />
                )}
                {!character.isMain && (
                  <StarInactive
                    onClick={onClickSetMainCharacter(character.id)}
                  />
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
      <AddMemoButtonContainer onClick={onClickAddCharacter}>
        인물 생성하기
      </AddMemoButtonContainer>
    </ContentsContainer>
  );
}
