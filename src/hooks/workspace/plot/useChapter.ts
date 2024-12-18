import {
  deleteChapter,
  updateChapterDescription,
  updateChapterFoldForLocal,
  updateChapterName,
} from "@/utils/APIs/workspace/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { TPlot } from "@/utils/APIs/types";

const useChapter = (chapterId: string,isFolded:boolean) => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  // 챕터 삭제하기
  const onChapterDeleteClick = useOnClickUpdate({
    mutationFn: deleteChapter(plot_id, chapterId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 삭제",
    errorMessage: "챕터 삭제에 실패했습니다.",
    onMutate: () => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
      const previousChapters = previousPlot?.chapter_list;
      if (!previousChapters) return;

      const newChapters = previousChapters.filter((chapter) => chapter.id !== chapterId);
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {
        ...previousPlot,
        chapter_list: newChapters,
      });

      return { previousPlot };
    },
    onError: async (_, __, context) => {
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  })();

  const onChapterNameChange = useInputLiveUpdate(updateChapterName(plot_id, chapterId), "챕터 이름", "챕터 이름 저장에 실패했습니다.");
  const onChapterDescriptionChange = useInputLiveUpdate(updateChapterDescription(plot_id, chapterId), "챕터 설명", "챕터 설명 저장에 실패했습니다.");

  // 챕터 접힘 여부 수정하기
  const updateChapterFold = useOnClickUpdate({
    mutationFn: updateChapterFoldForLocal(plot_id, chapterId),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 접힘 여부 수정",
    errorMessage: "챕터 접힘 여부 수정에 실패했습니다.",
    onMutate: () => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
      const previousChapters = previousPlot?.chapter_list;
      if (!previousChapters) return;

      const newChapters = previousChapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return { ...chapter, is_folded: !chapter.is_folded };
        }
        return chapter;
      });
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {
        ...previousPlot,
        chapter_list: newChapters,
      });

      return { previousPlot };
    },
    onError: async (_, __, context) => {
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  });

  const toggleChapterFold = updateChapterFold(!isFolded);

  return {
    onChapterDeleteClick,
    onChapterNameChange,
    onChapterDescriptionChange,
    toggleChapterFold,
  };
};

export default useChapter;
