"use Client";
import { useCharacterItem } from "@/hooks/dashboard/character/characterItem";
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
import { CharacterContext } from "@/hooks/workspace/character/character";
import { getName } from "@/utils/getCharacterName";
import { useMemoCharacter } from "@/hooks/dashboard/character/useMemoCharacterDetail";

export function CharacterItem({ character }: { character: TMCharacter }) {
  const { isOpenEditModal, onClickItem, closeEditModal } = useCharacterItem(
    character.id ?? ""
  );
  const value = useMemoCharacter(character.id ?? "");
  const realCharacter = (value.data ?? character) as TMCharacter;
  return (
    <>
      <CharacterCard
        onClick={character.id ? onClickItem : undefined}
        style={{ border: "1px solid black" }}
      >
        <CharacterCardTitle>
          <CharacterImage
            $src={realCharacter.ch_image}
            $heightPx={42}
            $widthPx={42}
          >
            {!realCharacter.ch_image && <p>{getName(realCharacter)[0]}</p>}
          </CharacterImage>
          <NameAndRole>
            <CharacterName
              $isNew={
                realCharacter.ch_name === "" ||
                (realCharacter.ch_name ? false : true)
              }
            >
              {character.id ? getName(realCharacter) : "생성 중"}
            </CharacterName>
            <CharacterRole>{realCharacter.role}</CharacterRole>
          </NameAndRole>
        </CharacterCardTitle>
        <CharacterDescription>
          {realCharacter.description}
          {character.id &&
            !realCharacter.description &&
            "인물 설명을 적어주세요."}
        </CharacterDescription>
        <MemoUpdatedDate>
          {new Date(realCharacter.updatedAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </MemoUpdatedDate>
      </CharacterCard>
      {isOpenEditModal && (
        <CharacterContext.Provider value={value}>
          <MCharacterModal closeModal={closeEditModal} />
        </CharacterContext.Provider>
      )}
    </>
  );
}
