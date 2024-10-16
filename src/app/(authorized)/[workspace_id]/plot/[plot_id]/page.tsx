"use client";

import ChapterList from "@/components/workspace/plot/ChapterList";
import ToggleBtn from "@/components/workspace/plot/ToggleBtn";
import { mockPlotList } from "@/utils/APIs/mock/plot";
import { useState } from "react";

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

  const [isOpen, setIsOpen] = useState(plot.is_folded);

  const handleChange = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
      {/* <ToggleBtn isOpen={isOpen} handleChange={handleChange} />
      {isOpen && <div>open</div>} */}

      <ChapterList
        chapters={plot.chapters}
        isOpenAll={isOpen}
        plotId={workspace_id}
      />
    </>
  );
}
