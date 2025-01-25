import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { useContext } from "react";
import OrangePlusIcon from "@/assets/icons/orangePlus.svg";
import {
  BlurBackground,
  ChangeCover,
  ChangeCoverInput,
  CoverImage,
  CoverImageContainer,
} from "@/styles/workspace/Info.style";

export default function MCharacterImage() {
  const { character, imageInputRef, onClickChangeImage, onChangeImage } =
    useContext(CharacterItemContext);

  return (
    <CoverImageContainer $isCharacter={true}>
      <BlurBackground $src={character.ch_image} />
      {character.ch_image && <CoverImage src={character.ch_image} />}
      {!character.ch_image && character.ch_name && (
        <p>{character.ch_name[0]}</p>
      )}
      {!character.ch_image && !character.ch_name && <p>이</p>}
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
