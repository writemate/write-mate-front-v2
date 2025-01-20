"use client";
import {
  Container,
  SubTitle,
  SubTitleWithButton,
  TextNavigationLink,
} from "@/styles/workspace/Info.style";
import { CharacterCardList } from "../character/CharacterCardList";
import {
  CharacterListContext,
  useCharacterList,
} from "@/hooks/workspace/character/characterList";
import { Help } from "@/components/Help";

export default function ScriptSidebar() {
  const useValue = useCharacterList();

  return (
    <CharacterListContext.Provider value={useValue}>
      <Container>
        <SubTitleWithButton>
          <SubTitle>
            주요 인물
            <Help messageKey="MAIN_CHARACTER" />
          </SubTitle>
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
    <TextNavigationLink href={`/${workspace_id}/character`}>
      인물 추가하러 가기
    </TextNavigationLink>
  );
}
