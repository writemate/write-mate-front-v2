import Modal from "@/components/Modal";
import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import { Input } from "@/styles";
import {
  ManageKeywordContainer,
  ManageRowWrapper,
  ManageKeywordLeft,
  InputWithButton,
  SelectColorContainer,
  RandomColor,
  SelectableColor,
  CreateKeywordButton,
  VerticalLine,
  ManageKeywordRight,
  KeywordListContainer,
  KeywordContainer,
} from "@/styles/workspace/Character.style";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import { useContext, useState } from "react";
import { WarningModal } from "@/components/dashboard/WarningModal";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { SubTitle } from "@/styles/workspace/Info.style";

export function KeywordManageModal() {
  const {
    closeModal,
    modalInput,
    onChangeModalInput,
    selectRandom,
    selectedColor,
    selectColor,
    onClickCreateKeyword,
    keywordList,
    onClickDeleteKeyword,
  } = useContext(CharacterListContext);
  const [deletingKeywordId, setDeletingKeywordId] = useState<string | null>(
    null
  );
  const isOpenDeleteModal = deletingKeywordId !== null;
  const openWarningModal = (keywordId: string) => () =>
    setDeletingKeywordId(keywordId);
  const closeWarningModal = () => setDeletingKeywordId(null);

  return (
    <Modal closeModal={closeModal} maxWidth={800}>
      <ManageKeywordContainer>
        <SubTitle>키워드 관리</SubTitle>
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
                    <KeywordCancel onClick={openWarningModal(keyword.id)} />
                  </KeywordContainer>
                ))}
              {isOpenDeleteModal && (
                <WarningModal
                  closeModal={closeWarningModal}
                  onClickConfirm={() => {
                    onClickDeleteKeyword(deletingKeywordId)();
                    closeWarningModal();
                  }}
                  onClickCancel={closeWarningModal}
                  message={"키워드를 삭제하시겠습니까? "}
                  ConfirmButtonName={"삭제"}
                />
              )}
            </KeywordListContainer>
          </ManageKeywordRight>
        </ManageRowWrapper>
      </ManageKeywordContainer>
    </Modal>
  );
}
