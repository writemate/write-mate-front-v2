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

const useEventList = () => {
  const queryClient = useQueryClient();
  const { plot_id } = useParams<{ plot_id: string }>();

  // 사건 추가하기 (만들기)
  const { mutate: mutateCreateE } = useMutation({
    mutationFn: () => createEvent(plot_id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: workspaceQueryKeys.eventList(plot_id),
      });

      const previousEvents = queryClient.getQueryData<PlotEventType[]>(
        workspaceQueryKeys.eventList(plot_id)
      );

      return { previousEvents };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.eventList(plot_id),
      });
    },
  });

  // 사건 삭제하기
  const { mutate: mutateDeleteE } = useMutation({
    mutationFn: (peventId: string) => deleteEvent(peventId),
    onError: (err, newTodo, context) => {
      showToastMessage("사건 삭제에 실패했습니다.", "error");
    },
    onSuccess: () => {
      showToastMessage("사건이 삭제되었습니다.", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.eventList(plot_id),
      });
    },
  });

  // 사건 이름 수정하기
  const { mutate: mutateEventName } = useMutation({
    mutationFn: ({ peventId, event_name }: TPatchUpdateENameRequest) =>
      updateEventName(peventId, event_name),
    onSuccess: (data, { peventId }) => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.event(peventId),
      });
    },
  });

  // 사건 설명 수정하기
  const { mutate: mutateEventD } = useMutation({
    mutationFn: ({ peventId, event_description }: TPatchUpdateEDRequest) =>
      updateEventDescription(peventId, event_description),
    onSuccess: (data, { peventId }) => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.event(peventId),
      });
    },
  });

  // 사건 순서 수정하기
  // todo: 테스트 후 toast 지우기
  const { mutate: mutateEventO } = useMutation({
    mutationFn: ({ peventId, pre_idx, next_idx }: TPatchUpdateEORequest) =>
      updateEventOrder(peventId, pre_idx, next_idx),
    onError: () => {
      showToastMessage("사건 순서 변경에 실패했습니다.", "error");
    },
    onSuccess: (data, { peventId }) => {
      showToastMessage("사건 순서 변경에 성공했습니다.", "success");
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapter(peventId),
      });
    },
  });

  return {
    mutateCreateE,
    mutateDeleteE,
    mutateEventName,
    mutateEventD,
    mutateEventO,
  };
};

export default useEventList;
