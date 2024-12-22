"use Client";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { CharacterCard } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList";
import { TMCharacter } from "@/utils/APIs/types";
import { useContext } from "react";

export function MemoItem({ character }: { character: TMCharacter }) {
  const { onClickMCharacterDescription } = useContext(DashboardContext).memoCharacterModal;
  const { selectedMCharacter } = useContext(DashboardContext).memoCharacterModal;
  const getName = () => {
    if (!character.description && !character.ch_name) return "이름 없음";
    if (!character.ch_name) return "" + character.description.slice(0, 10) + "...";
    if (character.ch_name.length > 10) return character.ch_name.slice(0, 10) + "...";
    return character.ch_name;
  };

  const getImg = () => {
    if (!character.ch_image) return getName().slice(0, 1);
    return <img src={character.ch_image} alt="인물 이미지" />;
  };

  return (
    <CharacterCard
      onClick={onClickMCharacterDescription(character)}
      style={{ border: "1px solid black" }}
      $isSelected={selectedMCharacter?.id === character.id}
    >
      <p>id: {character.id}</p>
      <p>
        이미지 예시: <img src="https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg" alt="예시 이미지" width="20px" height="20px" />
      </p>
      <p>이미지: {getImg()}</p>
      <p>이름: {getName()}</p>
    </CharacterCard>
  );
}
