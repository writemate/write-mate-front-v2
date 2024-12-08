import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { RoleContainer, Input } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterRole() {
  const { selectedMCharacter, onChangeSelectedMCharacterRole } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <RoleContainer>
      <p>역할</p>
      <Input
        defaultValue={selectedMCharacter.role}
        onChange={onChangeSelectedMCharacterRole}
        placeholder="인물의 역할을 입력하세요."
      />
    </RoleContainer>
  );
}
