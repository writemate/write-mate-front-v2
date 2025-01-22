"use client";
import {
  CoverContainer,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import CoverImageBox from "@/components/workspace/character/detail/CoverImageBox";
import BirthDayAndGender from "./BirthDayAndGender";
import Description from "./Description";

export default function Cover({
  isDeletable = true,
}: {
  isDeletable?: boolean;
}) {
  return (
    <CoverContainer>
      <CoverImageBox />
      <CoverContentsContainer>
        <BirthDayAndGender />
        <Description />
      </CoverContentsContainer>
    </CoverContainer>
  );
}
