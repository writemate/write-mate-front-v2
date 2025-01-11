import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { TextArea } from "@/styles";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { useContext } from "react";

export default function MCharacterDescription() {
  const { character, onChangeDescription } = useContext(CharacterItemContext);

  return (
    <Container>
      <SubTitle>인물 소개</SubTitle>
      <TextArea
        className="description"
        defaultValue={character.description}
        onChange={onChangeDescription}
        placeholder={
          "줄거리 내용을 적어주세요.\n연재처 정보란에 들어갈 줄거리 내용을 적어도 좋아요."
        }
        rows={5}
      />
    </Container>
  );
}
