"use Client";
import {
  CharacterItemContext,
  useCharacterItem,
} from "@/hooks/dashboard/character/characterItem";
import { CharacterCard } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList";
import { TMCharacter } from "@/utils/APIs/types";
import MCharacterModal from "./CharacterModal";
import {
  CharacterCardTitle,
  CharacterImage,
  CharacterName,
  CharacterRole,
  CharacterDescription,
  NameAndRole,
} from "@/styles/dashboard/IdeaBox/MCharacter/Character.style";

export function CharacterItem({ character }: { character: TMCharacter }) {
  const characterItemValue = useCharacterItem(character);
  const { isOpenEditModal, onClickItem } = characterItemValue;

  const getName = () => {
    if (!character.description && !character.ch_name) return "이름 없음";
    if (!character.ch_name)
      return "" + character.description.slice(0, 10) + "...";
    if (character.ch_name.length > 10)
      return character.ch_name.slice(0, 10) + "...";
    return character.ch_name;
  };

  return (
    <CharacterItemContext.Provider value={characterItemValue}>
      <CharacterCard
        onClick={onClickItem}
        style={{ border: "1px solid black" }}
      >
        <CharacterCardTitle>
          {!character.ch_image && (
            <CharacterImage $src="">{getName().slice(0, 1)}</CharacterImage>
          )}
          {character.ch_image && <CharacterImage $src={character.ch_image} />}
          <NameAndRole>
            <CharacterName>{getName()}</CharacterName>
            <CharacterRole>{character.role}</CharacterRole>
          </NameAndRole>
        </CharacterCardTitle>
        <CharacterDescription>
          {character.description}
          {!character.description && "인물 설명을 적어주세요."}
        </CharacterDescription>
      </CharacterCard>
      {isOpenEditModal && <MCharacterModal />}
    </CharacterItemContext.Provider>
  );
}
