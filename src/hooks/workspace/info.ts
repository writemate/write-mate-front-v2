import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getInfo, updateCoverImage, updateExpectedQuantity,
  updateGenre, updateIntroduction, updateLogline, updateTitle, updateGrade,
  addKeyword, removeKeyword } from "@/utils/APIs/workspace";
import { debounce } from "@/utils";
import { useParams } from "next/navigation";
import { createContext } from "react";

function useUpdate<T,U>({updateFn, onMutate, onChange}:{
  updateFn: (workspace_id: string) => (value: T) => Promise<void>,
  onMutate: (value: T) => void,
  onChange: (debouncedMutate: (value: T) => void) => (arg: U) => void
}) {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { mutate, isPending } = useMutation({
    mutationFn: updateFn(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
    onMutate,
  });
  const debouncedMutate = debounce(mutate, 500);
  return { onChange: onChange(debouncedMutate), isPending };
}

export function useInfo() {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.info(workspace_id),
    queryFn: getInfo(workspace_id),
  });

  const { onChange: onChangeTitle, isPending: isPendingTitle } = useUpdate({
    updateFn: updateTitle,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        title: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeLogline, isPending: isPendingLogline } = useUpdate({
    updateFn: updateLogline,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        logline: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLTextAreaElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeIntroduction, isPending: isPendingIntroduction } = useUpdate({
    updateFn: updateIntroduction,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        introduction: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLTextAreaElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeGenre, isPending: isPendingGenre } = useUpdate({
    updateFn: updateGenre,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        genre: value,
      }));
    },
    onChange: (debouncedMutate) => (option: string) => debouncedMutate(option),
  });

  const { onChange: onChangeGrade, isPending: isPendingGrade } = useUpdate({
    updateFn: updateGrade,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        grade: value,
      }));
    },
    onChange: (debouncedMutate) => (option: Parameters<ReturnType<typeof updateGrade>>[0]) => debouncedMutate(option),
  });

  const { onChange: onChangeExpectedQuantity, isPending: isPendingExpectedQuantity } = useUpdate({
    updateFn: updateExpectedQuantity,
    onMutate: (value) => {},
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isNaN(Number(value))) return;
      debouncedMutate(Number(value));
    },
  });
  
  const { onChange: onChangeCoverImage, isPending: isPendingCoverImage } = useUpdate({
    updateFn: updateCoverImage,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        cover: URL.createObjectURL(value),
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      debouncedMutate(file);
    },
  });

  return { data, error, isLoading, onChangeGrade, isPendingGrade,
    onChangeCoverImage, isPendingCoverImage, onChangeTitle, isPendingTitle,
    onChangeGenre, isPendingGenre, onChangeLogline, isPendingLogline,
    onChangeIntroduction, isPendingIntroduction,
    onChangeExpectedQuantity, isPendingExpectedQuantity};
}

export const InfoContext = createContext({} as ReturnType<typeof useInfo>);
