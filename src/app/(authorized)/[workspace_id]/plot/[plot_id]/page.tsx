"use client";
import ChapterList from "@/components/workspace/plot/ChapterList";
import usePlot, { PlotContext } from "@/hooks/workspace/plot/usePlot";
import { Title } from "@/styles/workspace";

export default function Plot() {
  const { plot_name, chapterList } = usePlot();
  return (
    <PlotContext.Provider value={chapterList}>
      <Title>{plot_name}</Title>
      <ChapterList/>
    </PlotContext.Provider>
  );
}
