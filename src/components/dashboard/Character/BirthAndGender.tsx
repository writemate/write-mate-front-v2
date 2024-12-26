import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import {
  BirthAndGenderContainer,
  BirthContainer,
  GenderContainer,
  Input,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterBirthAndGender() {
  const { character, onChangeBirthday, onChangeGender } =
    useContext(CharacterItemContext);

  return (
    <BirthAndGenderContainer>
      <BirthContainer>
        <p>탄생일</p>
        <Input
          className="birth"
          defaultValue={character.birthday}
          onChange={onChangeBirthday}
          placeholder="인물의 생년월일을 입력하세요."
        />
      </BirthContainer>
      <GenderContainer>
        <p>성별</p>
        <Input
          className="gender"
          defaultValue={character.gender}
          onChange={onChangeGender}
          placeholder="인물의 성별을 입력하세요."
        />
      </GenderContainer>
    </BirthAndGenderContainer>
  );
}
