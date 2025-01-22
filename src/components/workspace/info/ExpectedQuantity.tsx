"use client";
import {
  Container,
  SubTitle,
  TextWithDropMenu,
} from "@/styles/workspace/Info.style";
import { Input } from "@/styles";
import DropdownMenu from "@/components/DropdownMenu";
import { useContext } from "react";
import { InfoContext } from "@/hooks/workspace/info";
import { Help } from "@/components/Help";

export default function ScriptSidebar() {
  const {
    data,
    isLoading,
    onChangeExpectedQuantity,
    onChangeGrade,
    onChangeGenre,
  } = useContext(InfoContext);
  const { expected_quantity } = data ?? {};
  const realExpectedQuantity =
    (expected_quantity ?? 0) > 0 ? expected_quantity : undefined;
  const grade = data?.grade ?? "전체 이용가";
  const genre = data?.genre === "" ? null : data?.genre;

  return (
    <Container>
      <SubTitle>
        예상 분량
        <Help messageKey="EXPECTED_VOLUME" />
      </SubTitle>
      <TextWithDropMenu style={{}}>
        <Input
          type=""
          placeholder="예상 분량을 적어주세요"
          defaultValue={realExpectedQuantity}
          onChange={onChangeExpectedQuantity}
          disabled={isLoading}
        />
        <DropdownMenu
          placeholder="이용 등급"
          options={
            [
              "전체 이용가",
              "12세 이용가",
              "15세 이용가",
              "19세 이용가",
            ] as const
          }
          selected={grade}
          setSelected={onChangeGrade}
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
    </Container>
  );
}
