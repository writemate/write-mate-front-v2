import { CharacterListContext } from "@/hooks/workspace/character/characterList";
import {
  CharacterCardContainer,
  CharacterCardTitle,
  CharacterImage,
  CharacterName,
  CharacterRole,
  CharacterDescription,
  KeywordListContainerForCharacterCard,
  KeywordContainer,
} from "@/styles/workspace/Character.style";
import StarActive from "@/assets/workspace/character/starActive.svg";
import StarInactive from "@/assets/workspace/character/starInactive.svg";
import { TCharacter } from "@/utils/APIs/types";
import { useContext } from "react";
import { getName } from "@/utils/getCharacterName";
import { NameAndRole } from "@/styles/workspace/Character.style";
export function CharacterCard({
  index,
  character,
}: {
  index: number;
  character: TCharacter;
}) {
  const {
    workspace_id,
    onClickUnsetMainCharacter,
    onClickSetMainCharacter,
    isSelectedKeyword,
  } = useContext(CharacterListContext);

  return (
    <CharacterCardContainer
      key={index + 1}
      href={
        character.id === null
          ? "#"
          : `/${workspace_id}/character/${character.id}`
      }
    >
      <CharacterCardTitle>
        <CharacterImage $src={character.ch_image} $heightPx={42} $widthPx={42}>
          {!character.ch_image && <p>{getName(character)[0]}</p>}
        </CharacterImage>
        <NameAndRole>
          <CharacterName $isNew={character.ch_name === ""}>
            {getName(character)}
          </CharacterName>
          <CharacterRole>{character.role}</CharacterRole>
        </NameAndRole>
        {character.isMain && (
          <StarActive onClick={onClickUnsetMainCharacter(character.id)} />
        )}
        {!character.isMain && (
          <StarInactive onClick={onClickSetMainCharacter(character.id)} />
        )}
      </CharacterCardTitle>
      <CharacterDescription $isNew={character.description === ""}>
        {character.description}
        {character.description === "" && "인물 설명을 적어주세요."}
      </CharacterDescription>
      <KeywordListContainerForCharacterCard>
        {character.keyword.map((keyword, index) => {
          const isSelected = isSelectedKeyword(keyword.id);
          return (
            <KeywordContainer
              key={index}
              $lightColor={isSelected ? keyword.light_color : undefined}
              $darkColor={isSelected ? keyword.dark_color : undefined}
            >
              <span>{keyword.word}</span>
            </KeywordContainer>
          );
        })}
        {character.keyword.length === 0 && (
          <div style={{ color: "#B1B5C4" }}>키워드를 선택해주세요.</div>
        )}
      </KeywordListContainerForCharacterCard>
    </CharacterCardContainer>
  );
}
