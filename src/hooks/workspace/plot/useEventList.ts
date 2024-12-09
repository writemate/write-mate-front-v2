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
import {
  PlotEventType,
  TPatchUpdateEDRequest,
  TPatchUpdateENameRequest,
  TPatchUpdateEORequest,
} from "@/utils/APIs/mock/plot";
import { useEffect, useState } from "react";
import { getHandleDragAndDropFunctionForReorder } from "@/utils/getReorderFunction";
import { TPlotEvent } from "@/utils/APIs/types";

const useEventList = (chapterId: string, eventListFromServer: TPlotEvent[]) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  const [eventList, setEventList] = useState(eventListFromServer);
  useEffect(() => {
    setEventList(eventListFromServer);
  }, [eventListFromServer]);

  // 사건 추가하기 (만들기)
  const { mutate: mutateCreateE } = useMutation({
    mutationFn: createEvent(chapterId),
    onError: () => {
      showToastMessage("사건 추가에 실패했습니다.", "error");
    },
    onSuccess: () => {
      showToastMessage("사건이 추가되었습니다.", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    }
  });

  // 사건 삭제하기
  const { mutate: mutateDeleteE } = useMutation({
    mutationFn: deleteEvent(plot_id),
    onError: () => {
      showToastMessage("사건 삭제에 실패했습니다.", "error");
    },
    onSuccess: () => {
      showToastMessage("사건이 삭제되었습니다.", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  // 사건 이름 수정하기
  const { mutate: mutateEventName } = useMutation({
    mutationFn: updateEventName(chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  // 사건 설명 수정하기
  const { mutate: mutateEventD } = useMutation({
    mutationFn: updateEventDescription(chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  // 사건 순서 수정하기
  // todo: 테스트 후 toast 지우기
  const { mutate: mutateEventO } = useMutation({
    mutationFn: updateEventOrder(chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  const handleDragAndDrop = getHandleDragAndDropFunctionForReorder({
    mutationOrderFn: ({ itemId, pre_idx, next_idx }) =>
      mutateEventO({ peventId: itemId, pre_idx, next_idx }),
    item: eventList,
  });

  return {
    mutateCreateE,
    mutateDeleteE,
    mutateEventName,
    mutateEventD,
    mutateEventO,
    handleDragAndDrop,
    eventList
  };
};

export default useEventList;
