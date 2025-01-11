"use client";
import { useContext } from "react";
import {
  CoverContainer,
  SubTitle,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import CoverImageBox from "@/components/workspace/character/detail/CoverImageBox";
import { Input, DeleteButton } from "@/styles";
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Cover({
  isDeletable = true,
}: {
  isDeletable?: boolean;
}) {
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
        {isDeletable && (
          <DeleteButton
            onClick={onClickDeleteCharacter}
            style={{ marginLeft: "auto", marginBottom: "auto" }}
          >
            삭제하기
          </DeleteButton>
        )}
        <SubTitle>인물 이름</SubTitle>
        <Input
          type="text"
          placeholder="인물의 이름을 적어주세요"
          onChange={onChangeName}
          defaultValue={ch_name}
          disabled={isLoading}
        />
        <SubTitle>작품 속 역할</SubTitle>
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
