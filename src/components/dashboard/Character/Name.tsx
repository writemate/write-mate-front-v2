import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { Input } from "@/styles";
import { SubTitle } from "@/styles/workspace/Info.style";
import { useContext } from "react";

export default function MCharacterImage() {
  const { character, onChangeName } = useContext(CharacterItemContext);

  return (
    <>
      <SubTitle>인물 이름</SubTitle>
      <Input
        className="name"
        defaultValue={character.ch_name}
        onChange={onChangeName}
        placeholder="인물의 이름을 입력하세요."
      />
    </>
  );
}
