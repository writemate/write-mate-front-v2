import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getInfo, updateCoverImage, updateExpectedQuantity,
  updateGenre, updateIntroduction, updateLogline, updateTitle, updateGrade,
  addKeyword, removeKeyword } from "@/utils/APIs/workspace";
import { debounce } from "@/utils";
import { useParams } from "next/navigation";
import { createContext } from "react";

export function useInfo() {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.info(workspace_id),
    queryFn: getInfo(workspace_id),
  });

  const [
    { onChange: onChangeTitle, isPending: isPendingTitle },
    { onChange: onChangeLogline, isPending: isPendingLogline },
    { onChange: onChangeIntroduction, isPending: isPendingIntroduction },
  ] = ([["title", updateTitle], ["logline", updateLogline], ["introduction", updateIntroduction]] as const)
    .map(([key,fn]) => useMutation({
        mutationFn: fn(workspace_id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
        onMutate: (value: string) => {
          queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
            ...prev,
            [key]: value,
          }));
        }
    }))
    .map(({ mutate, isPending }) => ({ mutate: debounce(mutate, 500), isPending }))
    .map(({ mutate, isPending }) => ({ onChange: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => mutate(e.target.value), isPending }));
  
  const { onChange: onChangeGenre, isPending: isPendingGenre } = [useMutation({
    mutationFn: updateGenre(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
  })].map(({ mutate, isPending }) => ({ onChange: (option: string) => mutate(option), isPending }))[0];

  const { onChange: onChangeGrade, isPending: isPendingGrade } = [useMutation({
    mutationFn: updateGrade(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
  })].map(({ mutate, isPending }) => ({ onChange: (option: Parameters<ReturnType<typeof updateGrade>>[0]) => mutate(option), isPending }))[0];

  const { onChange: onChangeExpectedQuantity, isPending: isPendingExpectedQuantity } = [useMutation({
    mutationFn: updateExpectedQuantity(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
  })].map(({ mutate, isPending }) => ({ mutate: debounce(mutate, 500), isPending }))
    .map(({ mutate, isPending }) => ({ onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (isNaN(Number(value))) return;
      mutate(Number(value));
    }, isPending }))[0];

  const { onChange: onChangeCoverImage, isPending: isPendingCoverImage } = [useMutation({
    mutationFn: updateCoverImage(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
    onMutate: (file: File) => {
        if (!file) return;
        queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
          ...prev,
          cover: URL.createObjectURL(file),
        }));
    }
  })].map(({ mutate, isPending }) => ({ mutate: debounce(mutate, 500), isPending }))
    .map(({ mutate, isPending }) => ({ onChange: (e: React.ChangeEvent<HTMLInputElement>) =>{
      const file = e.target.files?.[0];
      if (!file) return;
      mutate(file);
    } , isPending }))[0];

  return { data, error, isLoading, onChangeGrade, isPendingGrade,
    onChangeCoverImage, isPendingCoverImage, onChangeTitle, isPendingTitle,
    onChangeGenre, isPendingGenre, onChangeLogline, isPendingLogline,
    onChangeIntroduction, isPendingIntroduction,
    onChangeExpectedQuantity, isPendingExpectedQuantity};
}

export const InfoContext = createContext({} as ReturnType<typeof useInfo>);
