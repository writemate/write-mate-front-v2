import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { Input } from "@/styles";
import { SubTitle } from "@/styles/workspace/Info.style";
import { useContext } from "react";

export default function MCharacterRole() {
  const { character, onChangeRole } = useContext(CharacterItemContext);

  return (
    <>
      <SubTitle>작품 속 역할</SubTitle>
      <Input
        className="role"
        defaultValue={character.role}
        onChange={onChangeRole}
        placeholder="인물의 역할을 입력하세요."
      />
    </>
  );
}
