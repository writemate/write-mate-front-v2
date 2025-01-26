"use client";
import {
  CoverImageContainer,
  CoverImage,
  BlurBackground,
  ChangeCover,
  ChangeCoverInput,
} from "@/styles/workspace/Info.style";
import { useContext, useRef } from "react";
import OrangePlusIcon from "@/assets/icons/orangePlus.svg";
import { CharacterContext } from "@/hooks/workspace/character/character";
import { CharacterImage } from "@/styles/workspace/Character.style";

export default function CoverImageBox() {
  const { data, isLoading, onChangeCoverImage, getName } =
    useContext(CharacterContext);
  const src = data?.ch_image ?? null;
  const ref = useRef<HTMLInputElement>(null);
  const onClickChangeCover = () => {
    ref.current?.click();
  };

  return (
    <CoverImageContainer $isCharacter={true}>
      <CharacterImage $src={src ?? ""} $heightPx={290} $widthPx={290}>
        {!src && data && <p>{getName(data)[0]}</p>}
      </CharacterImage>
      {/* <BlurBackground $src={src} />
      {src && <CoverImage src={src} />} */}
      <ChangeCoverInput
        type="file"
        accept="image/*"
        onChange={onChangeCoverImage}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      />
      {!isLoading && (
        <ChangeCover onClick={onClickChangeCover}>
          <span>
            <OrangePlusIcon />
            이미지 변경하기
          </span>
        </ChangeCover>
      )}
    </CoverImageContainer>
  );
}
