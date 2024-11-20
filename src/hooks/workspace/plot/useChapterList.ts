import {
  PlotChapterType,
  TPatchUpdateDRequest,
  TPatchUpdateFRequest,
  TPatchUpdateNameRequest,
  TPatchUpdateORequest,
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
import showToastMessage from "./showToastMessage";

const useChapterList = () => {
  const queryClient = useQueryClient();
  const { plot_id } = useParams<{ plot_id: string }>();

  // 챕터 추가하기 (만들기)
  const { mutate: mutateCreate } = useMutation({
    mutationFn: () => createChapter(plot_id),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: workspaceQueryKeys.chapterList(plot_id),
      });

      const previousChapters = queryClient.getQueryData<PlotChapterType[]>(
        workspaceQueryKeys.chapterList(plot_id)
      );

      return { previousChapters };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapterList(plot_id),
      });
    },
  });

  // 챕터 삭제하기
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (chapterId: string) => deleteChapter(plot_id, chapterId),
    onError: (err, newTodo, context) => {
      showToastMessage("챕터 삭제에 실패했습니다.", "error");
    },
    onSuccess: () => {
      showToastMessage("챕터가 삭제되었습니다.", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapterList(plot_id),
      });
    },
  });

  // 챕터 이름 수정하기
  const { mutate: mutateChapterName } = useMutation({
    mutationFn: ({ chapterId, chapter_name }: TPatchUpdateNameRequest) =>
      updateChapterName(plot_id, chapterId, chapter_name),
    onSuccess: (data, { chapterId }) => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapter(chapterId),
      });
    },
  });

  // 챕터 설명 수정하기
  const { mutate: mutateChapterDescription } = useMutation({
    mutationFn: ({ chapterId, chapter_description }: TPatchUpdateDRequest) =>
      updateChapterDescription(plot_id, chapterId, chapter_description),
    onSuccess: (data, { chapterId }) => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapter(chapterId),
      });
    },
  });

  // 챕터 순서 수정하기
  // todo: 테스트 후 toast 지우기
  const { mutate: mutateChapterOrder } = useMutation({
    mutationFn: ({ chapterId, pre_idx, next_idx }: TPatchUpdateORequest) =>
      updateChapterOrder(plot_id, chapterId, pre_idx, next_idx),
    onError: () => {
      showToastMessage("챕터 순서 변경에 실패했습니다.", "error");
    },
    onSuccess: (data, { chapterId }) => {
      showToastMessage("챕터 순서 변경에 성공했습니다.", "success");
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapter(chapterId),
      });
    },
  });

  // 챕터 접힘 여부 수정하기
  const { mutate: mutateChapterFold } = useMutation({
    mutationFn: ({ chapterId, is_folded }: TPatchUpdateFRequest) =>
      updateChapterFold(plot_id, chapterId, is_folded),
    onSuccess: (data, { chapterId }) => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.chapter(chapterId),
      });
    },
  });

  return {
    mutateCreate,
    mutateDelete,
    mutateChapterName,
    mutateChapterDescription,
    mutateChapterOrder,
    mutateChapterFold,
  };
};

export default useChapterList;
