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

  const changingNameSymbol = useRef<Symbol | null>(null);
  // 챕터 이름 수정하기
  const { mutate: mutateChapterName } = useMutation({
    mutationFn: updateChapterName(plot_id, chapterId),
    onMutate: (newName) => {
      console.log("onMutate", newName);
    },
    onSettled: () => {
      if(changingNameSymbol.current) {
        removeSaving(changingNameSymbol.current);
        changingNameSymbol.current = null;
      }
    },
    onError: (err, newTodo, context) => {
      notifyError("챕터 이름 저장에 실패했습니다.");
    },
  });

  const debounceChapterName = debounce(mutateChapterName, 500);
  const onChapterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceChapterName(e.target.value);
    console.log(changingNameSymbol.current);
    if(changingNameSymbol.current) return;
    changingNameSymbol.current = addSaving("챕터 이름 저장 중...");
  }

  // 챕터 설명 수정하기
  const { mutate: mutateChapterDescription } = useMutation({
    mutationFn: updateChapterDescription(plot_id, chapterId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.plot(workspace_id, plot_id),
      });
    },
  });

  const debounceChapterDescription = debounce(mutateChapterDescription, 500);
  const onChapterDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debounceChapterDescription(e.target.value);
  }

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
