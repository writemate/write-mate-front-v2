import {
  deleteChapter,
  updateChapterDescription,
  updateChapterFoldForLocal,
  updateChapterName,
} from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { notifySuccess, notifyError } from "@/utils/showToast";
import { useSaveLoading } from "@/stores/useSaveLoading";
import { debounce } from "@/utils";
import { useRef } from "react";
import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";

const useChapter = (chapterId: string) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  const addSaving = useSaveLoading((state) => state.add);
  const removeSaving = useSaveLoading((state) => state.remove);

  // 챕터 삭제하기
  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteChapter(plot_id, chapterId),
    onError: (err, newTodo, context) => {
      notifyError("챕터 삭제에 실패했습니다.");
    },
    onSuccess: () => {
      notifySuccess("챕터가 삭제되었습니다.");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  const onChapterNameChange = useInputLiveUpdate(updateChapterName(plot_id, chapterId), "챕터 이름", "챕터 이름 저장에 실패했습니다.");
  const onChapterDescriptionChange = useInputLiveUpdate(updateChapterDescription(plot_id, chapterId), "챕터 설명", "챕터 설명 저장에 실패했습니다.");

  // 챕터 접힘 여부 수정하기
  const { mutate: mutateChapterFold } = useMutation({
    mutationFn: updateChapterFoldForLocal(plot_id, chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  return {
    mutateDelete,
    onChapterNameChange,
    onChapterDescriptionChange,
    mutateChapterFold,
  };
};

export default useChapter;
