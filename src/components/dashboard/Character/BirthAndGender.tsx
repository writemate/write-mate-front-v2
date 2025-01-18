import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { Input } from "@/styles";
import {
  Container,
  SubTitle,
  TextWithDropMenu,
} from "@/styles/workspace/Info.style";
import { useContext } from "react";

export default function MCharacterBirthAndGender() {
  const { character, onChangeBirthday, onChangeGender } =
    useContext(CharacterItemContext);

  return (
    <TextWithDropMenu style={{ maxWidth: "748px", alignSelf: "flex-start" }}>
      <Container>
        <SubTitle>출생일</SubTitle>
        <Input
          className="birth"
          defaultValue={character.birthday}
          onChange={onChangeBirthday}
          placeholder={"출생일을 입력해주세요."}
        />
      </Container>
      <Container>
        <SubTitle>성별</SubTitle>
        <Input
          className="gender"
          defaultValue={character.gender}
          onChange={onChangeGender}
          placeholder={"성별을 입력해주세요."}
        />
      </Container>
    </TextWithDropMenu>
  );
}
