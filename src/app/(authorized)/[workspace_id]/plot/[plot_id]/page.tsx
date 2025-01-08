"use client";
import ChapterList from "@/components/workspace/plot/ChapterList";
import usePlot, { PlotContext } from "@/hooks/workspace/plot/usePlot";
import { Title } from "@/styles/workspace";

export default function Plot() {
  const plotValue = usePlot();
  return (
    <PlotContext.Provider value={plotValue}>
      <Title>
        {plotValue.isLoading && "불러오는 중"}
        {!plotValue.isLoading && plotValue.plot_name}
      </Title>
      <ChapterList />
    </PlotContext.Provider>
  );
}
