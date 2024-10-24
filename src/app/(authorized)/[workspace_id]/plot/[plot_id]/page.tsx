"use client";

import ChapterList from "@/components/workspace/plot/ChapterList";
import ToggleBtn from "@/components/workspace/plot/ToggleBtn";
import { mockPlotList } from "@/utils/APIs/mock/plot";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

/**
접는 로직 다시보기

 */

export default function Plot({
  params: { workspace_id },
}: {
  params: { workspace_id: string };
}) {
  //플롯데이터 요청 (GET_PLOT)
  const plot = mockPlotList;
  // const {
  //   data: chapterList,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["getplots", workspace_id],
  //   queryFn: () => getPlots(workspace_id),
  // });

  return (
    <>
      {/* <ToggleBtn isOpen={isOpen} handleChange={handleChange} />
      {isOpen && <div>open</div>} */}
      <ToastContainer />
      <ChapterList chapters={plot.chapters} plotId={workspace_id} />
    </>
  );
}
