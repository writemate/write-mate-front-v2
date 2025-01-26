import {
  CharacterItemContext,
  getName,
} from "@/hooks/dashboard/character/characterItem";
import { useContext } from "react";
import OrangePlusIcon from "@/assets/icons/orangePlus.svg";
import {
  ChangeCover,
  ChangeCoverInput,
  CoverImageContainer,
} from "@/styles/workspace/Info.style";
import { CharacterImage } from "@/styles/workspace/Character.style";

export default function MCharacterImage() {
  const { character, imageInputRef, onClickChangeImage, onChangeImage } =
    useContext(CharacterItemContext);

  return (
    <CoverImageContainer $isCharacter={true}>
      <CharacterImage $src={character.ch_image} $heightPx={290} $widthPx={290}>
        {!character.ch_image && <p>{getName(character)[0]}</p>}
      </CharacterImage>
      {/* <BlurBackground $src={character.ch_image} />
      {character.ch_image && <CoverImage src={character.ch_image} />}
      {!character.ch_image && character.ch_name && (
        <p>{character.ch_name[0]}</p>
      )}
      {!character.ch_image && !character.ch_name && <p>이</p>} */}
      <ChangeCoverInput
        onChange={onChangeImage}
        type="file"
        ref={imageInputRef}
        onClick={(event) => {
          event.stopPropagation();
          console.log("imageInputRef", imageInputRef);
        }}
      />
      <ChangeCover onClick={onClickChangeImage}>
        <span>
          <OrangePlusIcon />
          이미지 변경하기
        </span>
      </ChangeCover>
    </CoverImageContainer>
  );
}
