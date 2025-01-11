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

export default function ScriptSidebar() {
  const { data, isLoading, onChangeExpectedQuantity, onChangeGrade } =
    useContext(InfoContext);
  const { expectedQuantity } = data ?? {};
  const realExpectedQuantity =
    (expectedQuantity ?? 0) > 0 ? expectedQuantity : undefined;
  const grade = data?.grade ?? null;

  return (
    <Container>
      <SubTitle>예상 분량</SubTitle>
      <TextWithDropMenu style={{ maxWidth: 392 }}>
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
      </TextWithDropMenu>
    </Container>
  );
}
