"use client";
import {
  CoverContainer,
  CoverContentsContainer,
} from "@/styles/workspace/Info.style";
import CoverImageBox from "@/components/workspace/info/CoverImageBox";
import ExpectedQuantity from "./ExpectedQuantity";
import Introduction from "./Introduction";

export default function Cover() {
  return (
    <CoverContainer>
      <CoverImageBox />
      <CoverContentsContainer>
        <ExpectedQuantity />
        <Introduction />
      </CoverContentsContainer>
    </CoverContainer>
  );
}
