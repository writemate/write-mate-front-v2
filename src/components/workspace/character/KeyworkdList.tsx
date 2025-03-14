import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import { Input } from "@/styles";
import {
  KeywordListContainer,
  KeywordContainer,
  MiniModal,
  InputWithButton,
  KeywordAddDiv,
} from "@/styles/workspace/Character.style";
import AddButton from "@/assets/icons/addButton.svg";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import { useContext } from "react";
import { StateMessage } from "@/components/EmptyMessage";

export function KeywordList() {
  const {
    keywordListRef,
    isKeywordsLoading,
    keywordList,
    selectKeyword,
    isSelectedKeyword,
    removeSelectedKeyword,
    addButtonRef,
    openMiniModal,
    miniModalOpen,
    onBlurredMiniModal,
    miniModalLeftPosition,
    miniKeywordInput,
    onChangeMiniKeywordInput,
    onEnterPressAtMiniModal,
    onClickAddKeywordAtMiniModal,
  } = useContext(CharacterListContext);
  return (
    <KeywordListContainer ref={keywordListRef}>
      {isKeywordsLoading && <StateMessage messageKey="LOADING" absolute />}
      {!isKeywordsLoading && keywordList && keywordList.length === 0 && (
        <StateMessage messageKey="KEYWORD_EMPTY" absolute />
      )}
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
                isSelectedKeyword(keyword.id) ? keyword.light_color : undefined
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
                autoFocus
                placeholder="키워드 입력하기"
              />
              <button onMouseDown={onClickAddKeywordAtMiniModal}>추가</button>
            </InputWithButton>
          </MiniModal>
        )}
      </KeywordAddDiv>
    </KeywordListContainer>
  );
}
