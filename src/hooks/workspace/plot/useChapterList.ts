import {
  createChapter,
  updateChapterFold,
  updateChapterOrder,
} from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PlotContext } from "./usePlot";
import { useContext, useEffect, useState } from "react";
import useDragAndDrop from "./useDragAndDrop";
import { TChapter, TPlot } from "@/utils/APIs/types";
import { useSaveLoading } from "@/stores/useSaveLoading";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

const useChapterList = () => {
  const queryClient = useQueryClient();
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();

  const chapterListFromServer = useContext(PlotContext);
  const [chapterList, setChapterList] = useState([] as TChapter[]);
  const addSaving = useSaveLoading((state) => state.add);
  const removeSaving = useSaveLoading((state) => state.remove);

  useEffect(() => {
    if(!chapterListFromServer) return;
    setChapterList(chapterListFromServer);
  }, [chapterListFromServer]);

  const mutateCreate = useOnClickUpdate({
    mutationFn: createChapter(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 추가",
    errorMessage: "챕터 추가에 실패했습니다."
  })();

  // 챕터 순서 수정하기
  // todo: 테스트 후 toast 지우기
  const { mutate: mutateChapterOrder } = useMutation({
    mutationFn: updateChapterOrder(plot_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
    // onMutate: ({ chapterId, pre_idx, next_idx }) => {
    //   console.log("onMutate");

    //   const previousChapters = queryClient.getQueryData<PlotChapterType[]>(
    //     workspaceQueryKeys.plot(work_id, plot_id)
    //   );
    //   if(!previousChapters) return;

    //   const newChapters = [...previousChapters];
    //   const movedChapter = newChapters.splice(pre_idx, 1)[0];
    //   newChapters.splice(next_idx, 0, movedChapter);

    //   queryClient.setQueryData<PlotChapterType[]>(
    //     workspaceQueryKeys.plot(work_id, plot_id),
    //     newChapters
    //   );

    //   return { previousChapters };
    // }
  });

  // 챕터 접힘 여부 수정하기
  const mutateChapterFold = useOnClickUpdate({
    mutationFn: updateChapterFold(plot_id),
    queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
    savingMessage: "챕터 접힘 여부 수정",
    errorMessage: "챕터 접힘 여부 수정에 실패했습니다.",
    // onMutate: ({ chapterId, is_folded }) => {
    //   const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id));
    //   const previousChapters = previousPlot?.chapter_list;
    //   if(!previousChapters) return;

    //   const newChapters = previousChapters.map((chapter) => {
    //     if(chapter.id === chapterId) {
    //       return { ...chapter, is_folded };
    //     }
    //     return chapter;
    //   });

    //   queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: newChapters});

    //   return { previousChapters };
    // }
  });

  const { handleDragAndDrop } = useDragAndDrop({
    mutationOrderFn: ({ itemId, pre_idx, next_idx }) =>
      mutateChapterOrder({ chapterId: itemId, pre_idx, next_idx }),
    item: chapterList,
  });

  const areAllChaptersFolded = chapterList.every(
    (chapter) => chapter.is_folded
  );

  const toggleAllChapters = () => {
    const newFoldedState = !areAllChaptersFolded;
    chapterList.forEach((chapter) => {
      mutateChapterFold({ chapterId: chapter.id, is_folded: newFoldedState })();
    });
  };

  return {
    mutateCreate,
    mutateChapterOrder,
    mutateChapterFold,
    chapterList,
    handleDragAndDrop,
    areAllChaptersFolded,
    toggleAllChapters,
  };
};

export default useChapterList;
