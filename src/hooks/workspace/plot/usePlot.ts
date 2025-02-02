"use client";

import { getPlotInfo } from "@/utils/APIs/workspace/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useEffect } from "react";

const usePlot = () => {
  const { workspace_id, plot_id } = useParams<{
    workspace_id: string;
    plot_id: string;
  }>();
  const { data: plot, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    queryFn: getPlotInfo(plot_id),
  });

  useEffect(() => {
    //plot 로딩 후 주소에 #chapter_id가 있으면 해당 챕터로 이동, #event_id가 있으면 해당 이벤트로 이동
    const { hash } = window.location;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      // 이후에는 hash를 지워준다.
      window.location.hash = "";
    }
  }, [plot]);

  return {
    isLoading,
    plot_name: plot?.plot_name,
    chapterList: plot?.chapter_list,
    plot_id,
  };
};

export default usePlot;

export const PlotContext = createContext({} as ReturnType<typeof usePlot>);

// info 용 메인 플롯 훅
// usePlot과 거의 동일하여 이 자리에 둠.
import { getInfo } from "@/utils/APIs/workspace";
export const useMainPlot = () => {
  const { workspace_id } = useParams<{ workspace_id: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.info(workspace_id),
    queryFn: getInfo(workspace_id),
  });

  const plot = data?.mainPlot;

  return {
    isLoading,
    plot_name: plot?.plot_name,
    chapterList: plot?.chapter_list,
    plot_id: plot?.id!,
  };
};
