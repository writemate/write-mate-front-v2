import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import {
  DescriptionContainer,
  TextArea,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterDescription() {
  const { character, onChangeDescription } = useContext(CharacterItemContext);

  return (
    <DescriptionContainer>
      <p>설명</p>
      <TextArea
        className="description"
        defaultValue={character.description}
        onChange={onChangeDescription}
        placeholder="인물의 설명을 입력하세요."
      />
    </DescriptionContainer>
  );
}
