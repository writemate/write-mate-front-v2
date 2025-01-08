"use client";
import {
  Container,
  SubTitle,
  SubTitleWithButton,
} from "@/styles/workspace/Info.style";
import { CharacterCardList } from "../character/CharacterCardList";
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import { AddMemoButtonContainer } from "@/styles/workspace/Character.style";

export default function ScriptSidebar() {
  return (
    <Container>
      <SubTitleWithButton>
        <SubTitle>주요인물</SubTitle>
        <MoveToCharacter />
      </SubTitleWithButton>
      <CharacterCardList forInfoPage={true} />
    </Container>
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
