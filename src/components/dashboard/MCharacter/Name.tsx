import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { NameContainer, Input } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterImage() {
  const { selectedMCharacter, onChangeSelectedMCharacterName } = useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <NameContainer>
      <p>이름</p>
      <Input className="name" defaultValue={selectedMCharacter.ch_name} onChange={onChangeSelectedMCharacterName} placeholder="인물의 이름을 입력하세요." />
    </NameContainer>
  );
}
