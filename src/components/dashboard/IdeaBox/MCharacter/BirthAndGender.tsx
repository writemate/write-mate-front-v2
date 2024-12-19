import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  BirthAndGenderContainer,
  BirthContainer,
  GenderContainer,
  Input,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterBirthAndGender() {
  const {
    selectedMCharacter,
    onChangeSelectedMCharacterBirthday,
    onChangeSelectedMCharacterGender,
  } = useContext(DashboardContext).memoCharacterModal;
  if (!selectedMCharacter) {
    return null;
  }

  return (
    <BirthAndGenderContainer>
      <BirthContainer>
        <p>생년월일</p>
        <Input
          className="memo-modal-birth"
          defaultValue={selectedMCharacter.birthday}
          onChange={onChangeSelectedMCharacterBirthday}
          placeholder="인물의 생년월일을 입력하세요."
        />
      </BirthContainer>
      <GenderContainer>
        <p>성별</p>
        <Input
          className="memo-modal-gender"
          defaultValue={selectedMCharacter.gender}
          onChange={onChangeSelectedMCharacterGender}
          placeholder="인물의 성별을 입력하세요."
        />
      </GenderContainer>
    </BirthAndGenderContainer>
  );
}
