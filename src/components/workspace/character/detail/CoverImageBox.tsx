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

export default function CoverImageBox() {
  const { data, isLoading, onChangeCoverImage } = useContext(CharacterContext);
  const src = data?.ch_image ?? null;
  const ref = useRef<HTMLInputElement>(null);
  const onClickChangeCover = () => {
    ref.current?.click();
  };

  return (
    <CoverImageContainer>
      <BlurBackground $src={src} />
      {src && <CoverImage src={src} />}
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
