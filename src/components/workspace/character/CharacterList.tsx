"use client";
import {
  CharacterListContext,
  useCharacterList,
} from "@/hooks/workspace/character/characterList";
import {
  ContentsContainer,
  KeywordTitle,
  SubTitle,
  OpenManagement,
} from "@/styles/workspace/Character.style";
import { AddMemoButtonContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { CharacterCardList } from "./CharacterCardList";
import { KeywordList } from "./KeyworkdList";
import { KeywordManageModal } from "./KeywordManageModal";

export default function CharacterList() {
  const useValue = useCharacterList();
  const { onClickAddCharacter, isModalOpen, openModal } = useValue;

  return (
    <CharacterListContext.Provider value={useValue}>
      <ContentsContainer>
        <KeywordTitle>
          <SubTitle>키워드로 찾기</SubTitle>
          <OpenManagement onClick={openModal}>키워드 관리</OpenManagement>
          {isModalOpen && <KeywordManageModal />}
        </KeywordTitle>
        <KeywordList />
        <CharacterCardList forInfoPage={false} />
        <AddMemoButtonContainer onClick={onClickAddCharacter}>
          인물 생성하기
        </AddMemoButtonContainer>
      </ContentsContainer>
    </CharacterListContext.Provider>
  );
}
