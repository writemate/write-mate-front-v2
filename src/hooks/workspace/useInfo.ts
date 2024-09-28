import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getInfo, updateCoverImage, updateExpectedQuantity,
  updateGenre, updateIntroduction, updateLogline, updateTitle,
  addKeyword, removeKeyword } from "@/utils/APIs/workspace";
import { debounce } from "@/utils";
import { useParams } from "next/navigation";

export default function useInfo() {
  const queryClient = useQueryClient();
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.info(workspace_id),
    queryFn: getInfo(workspace_id),
  });

  const [{ onChange: onChangeCoverImage, isPending: isPendingCoverImage },
    { onChange: onChangeTitle, isPending: isPendingTitle },
    { onChange: onChangeGenre, isPending: isPendingGenre },
    { onChange: onChangeLogline, isPending: isPendingLogline },
    { onChange: onChangeIntroduction, isPending: isPendingIntroduction },
    { onChange: onChangeAddKeyword, isPending: isPendingAddKeyword },
    { onChange: onChangeRemoveKeyword, isPending: isPendingRemoveKeyword }] = [updateCoverImage, updateTitle, updateGenre,
      updateLogline, updateIntroduction, addKeyword, removeKeyword].map((fn) => useMutation({
        mutationFn: fn(workspace_id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
      }))
      .map(({ mutate, isPending }) => ({ mutate: debounce(mutate, 500), isPending }))
      .map(({ mutate, isPending }) => ({ onChange: (e: React.ChangeEvent<HTMLInputElement>) => mutate(e.target.value), isPending }));
  
  const { onChange: onChangeExpectedQuantity, isPending: isPendingExpectedQuantity } = [useMutation({
    mutationFn: updateExpectedQuantity(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.info(workspace_id) }),
  })].map(({ mutate, isPending }) => ({ mutate: debounce(mutate, 500), isPending }))
    .map(({ mutate, isPending }) => ({ onChange: (e: React.ChangeEvent<HTMLInputElement>) => mutate(e.target.value), isPending }))[0];

  return { data, error, isLoading, onChangeCoverImage, isPendingCoverImage, onChangeTitle, isPendingTitle, onChangeGenre, isPendingGenre, onChangeLogline, isPendingLogline, onChangeIntroduction, isPendingIntroduction, onChangeExpectedQuantity, isPendingExpectedQuantity, onChangeAddKeyword, isPendingAddKeyword, onChangeRemoveKeyword, isPendingRemoveKeyword };
}
