import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import {
  ImageContainer,
  ImageButtonContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function MCharacterImage() {
  const { character, onClickChangeImage, onChangeImage } =
    useContext(CharacterItemContext);

  return (
    <ImageContainer>
      <ImageButtonContainer>
        <input onChange={onChangeImage} type="file" />
        <button onClick={onClickChangeImage}>이미지 업로드</button>
      </ImageButtonContainer>
      {character.ch_image && (
        <img src={character.ch_image} alt={character.ch_name} />
      )}
      {!character.ch_image && character.ch_name && (
        <p>{character.ch_name[0]}</p>
      )}
      {!character.ch_image && !character.ch_name && <p> </p>}
    </ImageContainer>
  );
}
