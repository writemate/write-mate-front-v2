"use client";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { CharacterCardList } from "../character/CharacterCardList";

export default function ScriptSidebar() {
  return (
    <Container>
      <SubTitle>주요인물</SubTitle>
      <CharacterCardList forInfoPage={true} />
    </Container>
  );
}
