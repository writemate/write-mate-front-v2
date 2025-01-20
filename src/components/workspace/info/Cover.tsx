"use client";
import { useContext } from "react";
import {
  CoverContainer,
  SubTitle,
  TextWithDropMenu,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import CoverImageBox from "@/components/workspace/info/CoverImageBox";
import { Input, TextArea } from "@/styles";
import { InfoContext } from "@/hooks/workspace/info";
import DropdownMenu from "@/components/DropdownMenu";
import { Help } from "@/components/Help";

export default function Cover() {
  const {
    data,
    isLoading,
    onChangeTitle,
    onChangeGenre,
    onChangeLogline,
    onBlurTitle,
  } = useContext(InfoContext);
  const { title, logline } = data ?? {};
  const genre = data?.genre === "" ? null : data?.genre;
  return (
    <CoverContainer>
      <CoverImageBox />
      <CoverContentsContainer>
        <SubTitle>
          제목
          <Help messageKey="TITLE" />
        </SubTitle>
        <TextWithDropMenu>
          <Input
            type="text"
            placeholder="작품의 제목을 적어주세요."
            onChange={onChangeTitle}
            defaultValue={title}
            disabled={isLoading}
            onBlur={onBlurTitle}
          />
          <DropdownMenu
            placeholder="장르 선택"
            options={[
              "로맨스",
              "로맨스 판타지",
              "판타지",
              "현대 판타지",
              "무협",
              "미스터리",
              "라이트노벨",
              "BL / GL",
              "기타",
            ]}
            selected={genre ?? null}
            setSelected={onChangeGenre}
          />
        </TextWithDropMenu>
        <SubTitle>
          로그라인 <Help messageKey="LOGLINE" />
        </SubTitle>
        <TextArea
          placeholder="내 작품을 한 줄로 요약한 내용을 적어주세요."
          onChange={onChangeLogline}
          defaultValue={logline}
          disabled={isLoading}
        />
      </CoverContentsContainer>
    </CoverContainer>
  );
}
