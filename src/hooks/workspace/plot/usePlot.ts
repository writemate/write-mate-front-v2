'use client';

import { getPlotInfo } from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext } from "react";

const usePlot = () => {
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();
  const { data: plot, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    queryFn: getPlotInfo(plot_id),
  });

  return { isLoading, plot_name: plot?.plot_name, chapterList: plot?.chapter_list };
};

export default usePlot;

export const PlotContext = createContext({} as ReturnType<typeof usePlot>["chapterList"]);
