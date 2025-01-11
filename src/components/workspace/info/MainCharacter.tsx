"use client";
import {
  Container,
  SubTitle,
  SubTitleWithButton,
} from "@/styles/workspace/Info.style";
import { CharacterCardList } from "../character/CharacterCardList";
import {
  CharacterListContext,
  useCharacterList,
} from "@/hooks/workspace/character/characterList";
import { AddMemoButtonContainer } from "@/styles/workspace/Character.style";

export default function ScriptSidebar() {
  const useValue = useCharacterList();

  return (
    <CharacterListContext.Provider value={useValue}>
      <Container>
        <SubTitleWithButton>
          <SubTitle>주요인물</SubTitle>
          <MoveToCharacter />
        </SubTitleWithButton>
        <CharacterCardList forInfoPage={true} />
      </Container>
    </CharacterListContext.Provider>
  );
}

export function MoveToCharacter() {
  const { workspace_id } = useCharacterList();
  return (
    <AddMemoButtonContainer href={`/${workspace_id}/character`}>
      인물 관리하러 가기
    </AddMemoButtonContainer>
  );
}
