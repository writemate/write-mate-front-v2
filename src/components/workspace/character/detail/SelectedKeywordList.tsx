"use client";
import { useContext } from "react";
import { Input } from "@/styles";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import {
  KeywordListContainer,
  KeywordContainer,
  MiniModal,
  InputWithButton,
  KeywordAddDiv,
} from "@/styles/workspace/Character.style";
import { CharacterContext } from "@/hooks/workspace/character/character";
import AddButton from "@/assets/icons/addButton.svg";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import { useCharacterKeyword } from "@/hooks/workspace/character/useCharacterKeyword";

export default function Description() {
  const { data } = useContext(CharacterContext);
  const {
    onClickRemoveKeywordFromCharacter,
    keywordList,
    keywordListRef,
    addButtonRef,
    miniModalOpen,
    openMiniModal,
    miniKeywordInput,
    onBlurredMiniModal,
    onChangeMiniKeywordInput,
    miniModalLeftPosition,
    onClickAddKeywordToCharacter,
    onClickCreateAndAddKeywordToCharacter,
    creatingKeyword,
    onEnterPressAtMiniModal,
  } = useCharacterKeyword();
  const { keyword } = data ?? {};
  return (
    <Container>
      <SubTitle>키워드</SubTitle>
      <KeywordListContainer ref={keywordListRef}>
        {keyword &&
          keyword.map((keyword, index) => (
            <KeywordContainer
              key={index}
              $lightColor={keyword.light_color}
              $darkColor={keyword.dark_color}
            >
              <span>{keyword.word}</span>
              <KeywordCancel
                onClick={onClickRemoveKeywordFromCharacter(keyword.id)}
              />
            </KeywordContainer>
          ))}
        {creatingKeyword && (
          <KeywordContainer>
            <span>키워드 생성 중</span>
          </KeywordContainer>
        )}
        <KeywordAddDiv ref={addButtonRef}>
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
                  placeholder="키워드 입력하기"
                />
                <button onMouseDown={onClickCreateAndAddKeywordToCharacter}>
                  추가
                </button>
              </InputWithButton>
              {keywordList
                ?.filter(
                  ({ id }) => !keyword?.some((keyword) => keyword.id === id)
                )
                .map((keyword, index) => (
                  <KeywordContainer
                    key={index}
                    $lightColor={keyword.light_color}
                    $darkColor={keyword.dark_color}
                    onMouseDown={onClickAddKeywordToCharacter(keyword.id)}
                  >
                    <span>{keyword.word}</span>
                  </KeywordContainer>
                ))}
            </MiniModal>
          )}
        </KeywordAddDiv>
      </KeywordListContainer>
    </Container>
  );
}
