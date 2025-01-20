"use client";
import { Title } from "@/styles/workspace";
import { Infos } from "@/styles/workspace/Info.style";
import Cover from "@/components/workspace/info/Cover";
import Introduction from "@/components/workspace/info/Introduction";
import ExpectedQuantity from "@/components/workspace/info/ExpectedQuantity";
import MainCharacter from "@/components/workspace/info/MainCharacter";
import MainPlot from "@/components/workspace/info/MainPlot";
import { useInfo, InfoContext } from "@/hooks/workspace/info";
import MainScript from "@/components/workspace/info/MainScript";
import { Help } from "@/components/Help";

export default function Info() {
  const value = useInfo();

  return (
    <InfoContext.Provider value={value}>
      <Title>
        작품 기획
        <Help messageKey="PLAN" />
      </Title>
      <Cover />
      <Infos>
        <Introduction />
        <ExpectedQuantity />
        <MainCharacter />
        <MainPlot />
        <MainScript />
      </Infos>
    </InfoContext.Provider>
  );
}
