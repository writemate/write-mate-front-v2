import {
  createEvent,
  deleteEvent,
  updateEventDescription,
  updateEventName,
  updateEventOrder,
} from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import showToastMessage from "./showToastMessage";
import { useEffect, useState } from "react";
import { getHandleDragAndDropFunctionForReorder } from "@/utils/getReorderFunction";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { TPlot } from "@/utils/APIs/types";

const useEventList = (chapterId: string) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  const onClickCreate = useOnClickUpdate({
    mutationFn: createEvent(chapterId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "사건 추가",
    errorMessage: "사건 추가에 실패했습니다."
  })();

  // 사건 순서 수정하기
  const mutateEventOrder  = useOnClickUpdate({
    mutationFn: updateEventOrder(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 순서 수정",
    errorMessage: "챕터 순서 수정에 실패했습니다.",
    onMutate: ({ peventId, pre_idx, next_idx }) => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
      const previousChapters = previousPlot?.chapter_list;
      if(!previousChapters) return;
      const previousEventList = previousChapters.find((chapter) => chapter.id === chapterId)?.pevent_list;
      if(!previousEventList) return;

      const newEventList = [...previousEventList];
      const movedEvent = newEventList.splice(pre_idx, 1)[0];
      newEventList.splice(next_idx, 0, movedEvent);

      const newChapters = previousChapters.map((chapter) => {
        if(chapter.id === chapterId) {
          return { ...chapter, pevent_list: newEventList };
        }
        return chapter;
      });

      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: newChapters});

      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
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
