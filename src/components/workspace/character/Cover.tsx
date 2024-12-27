"use client";
import { useContext } from "react";
import {
  CoverContainer,
  Container,
  SubTitle,
  TextWithDropMenu,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import CoverImageBox from "@/components/workspace/character/CoverImageBox";
import { Input, ButtonWithHoverAnimation } from "@/styles";
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Cover() {
  const {
    data,
    isLoading,
    onClickDeleteCharacter,
    onChangeName,
    onChangeRole,
  } = useContext(CharacterContext);
  const { ch_name, role } = data ?? {};
  return (
    <CoverContainer>
      <CoverImageBox />
      <CoverContentsContainer>
        <ButtonWithHoverAnimation
          onClick={onClickDeleteCharacter}
          style={{ marginLeft: "auto", marginBottom: "auto" }}
        >
          삭제
        </ButtonWithHoverAnimation>
        <SubTitle>인물 이름</SubTitle>
        <Input
          type="text"
          placeholder="인물의 이름을 적어주세요"
          onChange={onChangeName}
          defaultValue={ch_name}
          disabled={isLoading}
        />
        <SubTitle style={{ marginTop: 46 }}>작품 속 역할</SubTitle>
        <Input
          placeholder="작품 속 인물의 역할을 적어주세요"
          onChange={onChangeRole}
          defaultValue={role}
          disabled={isLoading}
        />
      </CoverContentsContainer>
    </CoverContainer>
  );
}
