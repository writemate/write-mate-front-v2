"use client";
import { Title } from "@/styles/workspace";
import { Infos } from "@/styles/workspace/Info.style";
import Cover from "@/components/workspace/info/Cover";
import MainCharacter from "@/components/workspace/info/MainCharacter";
import MainPlot from "@/components/workspace/info/MainPlot";
import { useInfo, InfoContext } from "@/hooks/workspace/info";
import MainScript from "@/components/workspace/info/MainScript";

export default function Info() {
  const value = useInfo();
  const { data, isLoading, onChangeTitle, onBlurTitle } = value;

  return (
    <InfoContext.Provider value={value}>
      <Title>
        <input
          type="text"
          placeholder="작품의 제목을 적어주세요."
          onChange={onChangeTitle}
          defaultValue={data?.title}
          disabled={isLoading}
          onBlur={onBlurTitle}
        />
      </Title>
      <Cover />
      <Infos>
        <MainCharacter />
        <MainPlot />
        <MainScript />
      </Infos>
    </InfoContext.Provider>
  );
}
