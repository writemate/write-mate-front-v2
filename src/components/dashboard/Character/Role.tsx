import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { RoleContainer, Input } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterRole() {
  const { character, onChangeRole } = useContext(CharacterItemContext);

  return (
    <RoleContainer>
      <p>작품 속 역할</p>
      <Input
        className="role"
        defaultValue={character.role}
        onChange={onChangeRole}
        placeholder="인물의 역할을 입력하세요."
      />
    </RoleContainer>
  );
}
