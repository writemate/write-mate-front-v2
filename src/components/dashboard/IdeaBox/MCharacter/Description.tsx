import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  DescriptionContainer,
  TextArea,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterDescription() {
  const { selectedMCharacter, onChangeSelectedMCharacterDescription } =
    useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <DescriptionContainer>
      <p>한줄 설명</p>
      <TextArea
        defaultValue={selectedMCharacter.description}
        onChange={onChangeSelectedMCharacterDescription}
        placeholder="인물의 설명을 입력하세요."
      />
    </DescriptionContainer>
  );
}
