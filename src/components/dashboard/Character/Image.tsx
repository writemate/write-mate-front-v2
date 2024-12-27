import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import {
  ImageContainer,
  ImageButtonContainer,
  ChangeCover,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";
import OrangePlusIcon from "@/assets/icons/orangePlus.svg";

export default function MCharacterImage() {
  const { character, imageInputRef, onClickChangeImage, onChangeImage } =
    useContext(CharacterItemContext);

  return (
    <ImageContainer>
      <ImageButtonContainer>
        <input
          onChange={onChangeImage}
          type="file"
          ref={imageInputRef}
          onClick={(event) => {
            event.stopPropagation();
            console.log("imageInputRef", imageInputRef);
          }}
        />
        <ChangeCover onClick={onClickChangeImage}>
          <OrangePlusIcon />
          이미지 변경하기
        </ChangeCover>
      </ImageButtonContainer>
      {character.ch_image && (
        <img src={character.ch_image} alt={character.ch_name} />
      )}
      {!character.ch_image && character.ch_name && (
        <p>{character.ch_name[0]}</p>
      )}
      {!character.ch_image && !character.ch_name && <p>이</p>}
    </ImageContainer>
  );
}
