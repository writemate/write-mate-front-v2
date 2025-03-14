"use client";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { TextArea } from "@/styles";
import { useContext } from "react";
import { InfoContext } from "@/hooks/workspace/info";
import { Help } from "@/components/Help";

export default function ScriptSidebar() {
  const { data, isLoading, onChangeIntroduction } = useContext(InfoContext);
  const { introduction } = data ?? {};
  return (
    <Container>
      <SubTitle>
        작품 소개
        <Help messageKey="WORK_INTRO" />
      </SubTitle>
      <TextArea
        placeholder={
          "줄거리 내용을 적어주세요.\n연재처 정보란에 들어갈 줄거리 내용을 적어도 좋아요."
        }
        rows={5}
        onChange={onChangeIntroduction}
        defaultValue={introduction}
        disabled={isLoading}
      />
    </Container>
  );
}
