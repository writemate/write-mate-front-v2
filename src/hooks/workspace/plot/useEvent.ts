import {
  deleteEvent,
  updateEventDescription,
  updateEventName,
} from "@/utils/APIs/workspace/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { TPlot } from "@/utils/APIs/types";
import { useCallback, useEffect, useRef, useState } from "react";

const useEvent = (eventId: string, chapterId: string) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{
    workspace_id: string;
    plot_id: string;
  }>();
  const [selectCharacterModal, setselectCharacterModal] = useState(false);
  const [editCharacterModal, setEditCharacterModal] = useState<string | null>(
    null
  );
  const selectModalRef = useRef<HTMLDivElement>(null);

  const openSelectCharacterModal = useCallback(
    () => setselectCharacterModal(true),
    []
  );
  const closeSelectCharacterModal = useCallback(
    () => setselectCharacterModal(false),
    []
  );
  const openEditCharacterModal = (characterId: string) => () =>
    setEditCharacterModal(characterId);
  const closeEditCharacterModal = useCallback(
    () => setEditCharacterModal(null),
    []
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectModalRef.current &&
        !selectModalRef.current.contains(e.target as Node)
      ) {
        closeSelectCharacterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 사건 삭제하기
  const onEventDeleteClick = useOnClickUpdate({
    mutationFn: deleteEvent(chapterId, eventId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "사건 삭제",
    errorMessage: "사건 삭제에 실패했습니다.",
    onMutate: () => {
      const previousPlot = queryClient.getQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id)
      );
      const previousChapters = previousPlot?.chapter_list;
      if (!previousChapters) return;
      const previousEventList = previousChapters.find(
        (chapter) => chapter.id === chapterId
      )?.pevent_list;
      if (!previousEventList) return;

      const newEventList = previousEventList.filter(
        (event) => event.id !== eventId
      );
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
    onError: async (_, __, context) => {
      queryClient.setQueryData<TPlot>(
        workspaceQueryKeys.plot(workspace_id, plot_id),
        context?.previousPlot
      );
    },
  })();

  const onEventNameChange = useInputLiveUpdate(
    updateEventName(chapterId, eventId),
    "사건 제목",
    "사건 제목 저장에 실패했습니다."
  );
  const onEventDescriptionChange = useInputLiveUpdate(
    updateEventDescription(chapterId, eventId),
    "사건 설명",
    "사건 설명 저장에 실패했습니다."
  );

  return {
    selectModalRef,
    selectCharacterModal,
    openSelectCharacterModal,
    closeSelectCharacterModal,
    editCharacterModal,
    openEditCharacterModal,
    closeEditCharacterModal,
    onEventDeleteClick,
    onEventNameChange,
    onEventDescriptionChange,
  };
};

export default useEvent;
