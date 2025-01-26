"use Client";
import {
  CharacterItemContext,
  useCharacterItem,
} from "@/hooks/dashboard/character/characterItem";
import { CharacterCard } from "@/styles/dashboard/IdeaBox/MCharacter/MCharacterList.style";
import { TMCharacter } from "@/utils/APIs/types";
import MCharacterModal from "./MemoCharacterModal";
import { MemoUpdatedDate } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";
import {
  CharacterCardTitle,
  CharacterDescription,
  CharacterImage,
  CharacterName,
  CharacterRole,
} from "@/styles/workspace/Character.style";
import { NameAndRole } from "@/styles/workspace/Character.style";

export function CharacterItem({ character }: { character: TMCharacter }) {
  const characterItemValue: ReturnType<typeof useCharacterItem> =
    useCharacterItem(character);
  const { isOpenEditModal, onClickItem, getName } = characterItemValue;

  return (
    <CharacterItemContext.Provider value={characterItemValue}>
      <CharacterCard
        onClick={onClickItem}
        style={{ border: "1px solid black" }}
      >
        <CharacterCardTitle>
          <CharacterImage
            $src={character.ch_image}
            $heightPx={42}
            $widthPx={42}
          >
            {!character.ch_image && <p>{getName(character)[0]}</p>}
          </CharacterImage>
          <NameAndRole>
            <CharacterName
              $isNew={
                character.ch_name === "" || (character.ch_name ? false : true)
              }
            >
              {getName(character)}
            </CharacterName>
            <CharacterRole>{character.role}</CharacterRole>
          </NameAndRole>
        </CharacterCardTitle>
        <CharacterDescription>
          {character.description}
          {!character.description && "인물 설명을 적어주세요."}
        </CharacterDescription>
        <MemoUpdatedDate>
          {new Date(character.updatedAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </MemoUpdatedDate>
      </CharacterCard>
      {isOpenEditModal && <MCharacterModal />}
    </CharacterItemContext.Provider>
  );
}
