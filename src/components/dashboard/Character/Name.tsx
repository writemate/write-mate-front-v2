import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { NameContainer, Input } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterImage() {
  const { character, onChangeName } = useContext(CharacterItemContext);

  return (
    <NameContainer>
      <p>이름</p>
      <Input
        className="name"
        defaultValue={character.ch_name}
        onChange={onChangeName}
        placeholder="인물의 이름을 입력하세요."
      />
    </NameContainer>
  );
}
