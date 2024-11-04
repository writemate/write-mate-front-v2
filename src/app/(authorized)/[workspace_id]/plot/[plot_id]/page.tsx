"use client";

import ChapterList from "@/components/workspace/plot/ChapterList";
import ToggleBtn from "@/components/workspace/plot/ToggleBtn";
import { getPlot, mockPlotList } from "@/utils/APIs/mock/plot";
import { getPlots } from "@/utils/APIs/plot";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

/**
접는 로직 다시보기

 */

export default function Plot({
  params: { plot_id },
}: {
  params: { plot_id: string };
}) {
  //플롯데이터 요청 (GET_PLOT)
  const {
    data: plot,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getplots", plot_id],
    queryFn: () => getPlot(plot_id),
  });

  return (
    <>
      {/* <ToggleBtn isOpen={isOpen} handleChange={handleChange} />
      {isOpen && <div>open</div>} */}
      <ToastContainer />
      {plot&&<ChapterList chapters={plot.chapters} plotId={plot_id} />}
    </>
  );
}
