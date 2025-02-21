import { createEvent, updateEventOrder } from "@/utils/APIs/workspace/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getHandleDragAndDropFunctionForReorder } from "@/utils/getReorderFunction";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { TPlot } from "@/utils/APIs/types";

const useEventList = (chapterId: string) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{
    workspace_id: string;
    plot_id: string;
  }>();

  const onClickCreate = useOnClickUpdate({
    mutationFn: createEvent(chapterId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "사건 추가",
    errorMessage: "사건 추가에 실패했습니다.",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.info(workspace_id),
      });
    },
    onMutate: () => {
      const previousPlot = queryClient.getQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id)
      );
      const previousChapters = previousPlot?.chapter_list;
      if (!previousChapters) return;
      const newChapters = previousChapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            pevent_list: [
              ...chapter.pevent_list,
              {
                id: null,
                event_name: "",
                event_description: "",
                character_list: [],
              },
            ],
          };
        }
        return chapter;
      });
      queryClient.setQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id),
        { ...previousPlot, chapter_list: newChapters }
      );
      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.plot(workspace_id, plot_id),
        context?.previousPlot
      );
    },
  })();

  // 사건 순서 수정하기
  const mutateEventOrder = useOnClickUpdate({
    mutationFn: updateEventOrder(chapterId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 순서 수정",
    errorMessage: "챕터 순서 수정에 실패했습니다.",
    onMutate: ({ peventId, pre_idx, next_idx }) => {
      const previousPlot = queryClient.getQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id)
      );
      const previousChapters = previousPlot?.chapter_list;
      if (!previousChapters) return;
      const previousEventList = previousChapters.find(
        (chapter) => chapter.id === chapterId
      )?.pevent_list;
      if (!previousEventList) return;

      const newEventList = [...previousEventList];
      const movedEvent = newEventList.splice(pre_idx, 1)[0];
      newEventList.splice(next_idx, 0, movedEvent);

      const newChapters = previousChapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return { ...chapter, pevent_list: newEventList };
        }
        return chapter;
      });
      queryClient.setQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id),
        { ...previousPlot, chapter_list: newChapters }
      );

      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.plot(workspace_id, plot_id),
        context?.previousPlot
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.info(workspace_id),
      });
    },
  });

  const handleDragAndDrop = getHandleDragAndDropFunctionForReorder({
    mutationOrderFn: ({ itemId, pre_idx, next_idx }) =>
      mutateEventOrder({ peventId: itemId, pre_idx, next_idx }),
  });

  return {
    onClickCreate,
    handleDragAndDrop,
  };
};

export default useEventList;
