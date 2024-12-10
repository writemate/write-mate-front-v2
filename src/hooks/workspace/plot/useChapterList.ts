import {
  createChapter,
  updateChapterFoldAll,
  updateChapterOrder,
} from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PlotContext } from "./usePlot";
import { useContext } from "react";
import { getHandleDragAndDropFunctionForReorder } from "@/utils/getReorderFunction";
import { TPlot } from "@/utils/APIs/types";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

const useChapterList = () => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  const chapterList = useContext(PlotContext) ?? [];

  const onClickCreate = useOnClickUpdate({
    mutationFn: createChapter(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 추가",
    errorMessage: "챕터 추가에 실패했습니다."
  })();

  // 챕터 순서 수정하기
  const mutateChapterOrder  = useOnClickUpdate({
    mutationFn: updateChapterOrder(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 순서 수정",
    errorMessage: "챕터 순서 수정에 실패했습니다.",
    onMutate: ({ chapterId, pre_idx, next_idx }) => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
      const previousChapters = previousPlot?.chapter_list;
      if(!previousChapters) return;

      const newChapters = [...previousChapters];
      const movedChapter = newChapters.splice(pre_idx, 1)[0];
      newChapters.splice(next_idx, 0, movedChapter);

      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: newChapters});

      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  });

  const handleDragAndDrop = getHandleDragAndDropFunctionForReorder({
    mutationOrderFn: ({ itemId, pre_idx, next_idx }) =>
      mutateChapterOrder({ chapterId: itemId, pre_idx, next_idx }),
  });

  // 챕터 접힘 여부 수정하기
  const mutateChapterFold = useOnClickUpdate({
    mutationFn: updateChapterFoldAll(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 접힘 여부 수정",
    errorMessage: "챕터 접힘 여부 수정에 실패했습니다.",
    onMutate: (is_folded) => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
      const previousChapters = previousPlot?.chapter_list;
      if(!previousChapters) return;

      const newChapters = previousChapters.map((chapter) => {
          return { ...chapter, is_folded };
      });

      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: newChapters});

      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  });

  const areAllChaptersFolded = chapterList.every(
    (chapter) => chapter.is_folded
  );

  const toggleAllChapters = () => mutateChapterFold(!areAllChaptersFolded);  

  return {
    onClickCreate,
    chapterList,
    handleDragAndDrop,
    areAllChaptersFolded,
    toggleAllChapters,
  };
};

export default useChapterList;
