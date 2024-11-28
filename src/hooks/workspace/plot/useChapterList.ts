import {
  PlotChapterType,
} from "@/utils/APIs/mock/plot";
import {
  createChapter,
  deleteChapter,
  updateChapterDescription,
  updateChapterFold,
  updateChapterName,
  updateChapterOrder,
} from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { notifySuccess, notifyError } from "@/utils/showToast";
import { PlotContext } from "./usePlot";
import { useContext, useEffect, useState } from "react";
import useDragAndDrop from "./useDragAndDrop";
import { TChapter } from "@/utils/APIs/types";

const useChapterList = () => {
  const queryClient = useQueryClient();
  const { work_id, plot_id } = useParams<{ work_id: string; plot_id: string }>();

  const chapterListFromServer = useContext(PlotContext);
  const [chapterList, setChapterList] = useState([] as TChapter[]);

  useEffect(() => {
    if(!chapterListFromServer) return;
    setChapterList(chapterListFromServer);
  }, [chapterListFromServer]);

  // 챕터 추가하기 (만들기)
  const { mutate: mutateCreate } = useMutation({
    mutationFn: createChapter(plot_id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });

      const previousChapters = queryClient.getQueryData<PlotChapterType[]>(
        workspaceQueryKeys.plot(work_id, plot_id)
      );

      return { previousChapters };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
  });

  // 챕터 삭제하기
  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteChapter(plot_id),
    onError: (err, newTodo, context) => {
      notifyError("챕터 삭제에 실패했습니다.");
    },
    onSuccess: () => {
      notifySuccess("챕터가 삭제되었습니다.");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
  });

  // 챕터 이름 수정하기
  const { mutate: mutateChapterName } = useMutation({
    mutationFn: updateChapterName(plot_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
  });

  // 챕터 설명 수정하기
  const { mutate: mutateChapterDescription } = useMutation({
    mutationFn: updateChapterDescription(plot_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
  });

  // 챕터 순서 수정하기
  // todo: 테스트 후 toast 지우기
  const { mutate: mutateChapterOrder } = useMutation({
    mutationFn: updateChapterOrder(plot_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
  });

  // 챕터 접힘 여부 수정하기
  const { mutate: mutateChapterFold } = useMutation({
    mutationFn: updateChapterFold(plot_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(work_id, plot_id),
      });
    },
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
    setChapterList((prevChapters) =>
      prevChapters.map((chapter) => ({
        ...chapter,
        is_folded: newFoldedState,
      }))
    );
    chapterList.forEach((chapter) => {
      mutateChapterFold({ chapterId: chapter.id, is_folded: newFoldedState });
    });
  };

  const handleLocalFold = (id: string, isFolded: boolean) => {
    setChapterList((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === id ? { ...chapter, is_folded: isFolded } : chapter
      )
    );
    mutateChapterFold({ chapterId: id, is_folded: isFolded });
  };

  return {
    mutateCreate,
    mutateDelete,
    mutateChapterName,
    mutateChapterDescription,
    mutateChapterOrder,
    mutateChapterFold,
    chapterList,
    handleDragAndDrop,
    areAllChaptersFolded,
    toggleAllChapters,
  };
};

export default useChapterList;
