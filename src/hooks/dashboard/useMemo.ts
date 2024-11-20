import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getMemoList,
  updateMemoDescription,
  updaetMemoName,
  deleteMemo,
  createMemo,
} from "@/utils/APIs/memo";
import { useCallback, useEffect, useState } from "react";
import { TMemo } from "@/utils/APIs/types";
import { debounce } from "@/utils";

export function useMemo() {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [memoList, setMemoList] = useState<TMemo[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: memoQueryKeys.memoList(),
    queryFn: getMemoList,
  });
  const {
    mutate: createMemoMutation,
    isPending: isCreating,
    mutateAsync: createMemoAsync,
  } = useMutation({
    mutationFn: createMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
    },
  });
  const { mutate: updateMemoNameMutation, isPending: isUpdatingName } =
    useMutation({ mutationFn: updaetMemoName });
  const {
    mutate: updateMemoDescriptionMutation,
    isPending: isUpdatingDescription,
  } = useMutation({ mutationFn: updateMemoDescription });
  const { mutate: deleteMemoMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
    },
    onMutate: async (id: string) => {
      const previousMemoList = queryClient.getQueryData<TMemo[]>(
        memoQueryKeys.memoList()
      );
      queryClient.setQueryData<TMemo[]>(
        memoQueryKeys.memoList(),
        (old) => old?.filter((memo) => memo.id !== id) || []
      );
      return { previousMemoList };
    },
  });

  const debounceUpdateMemoName = useCallback(
    debounce(updateMemoNameMutation, 500),
    [data]
  );
  const debounceUpdateMemoDescription = useCallback(
    debounce(updateMemoDescriptionMutation, 500),
    [data]
  );
  const onClickCreateMemo = () => {
    createMemoMutation();
  };
  const onClickDeleteMemo = (id: string) => () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    deleteMemoMutation(id);
  };
  const onClickOpenModal = () => {
    setOpenModal(true);
  };
  const onChangeMemoName =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceUpdateMemoName({ id, memo_name: e.target.value });
      setMemoList((old) =>
        old.map((memo) =>
          memo.id === id ? { ...memo, memo_name: e.target.value } : memo
        )
      );
    };
  const onChangeMemoDescription =
    (id: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounceUpdateMemoDescription({ id, memo_description: e.target.value });
      setMemoList((old) =>
        old.map((memo) =>
          memo.id === id ? { ...memo, memo_description: e.target.value } : memo
        )
      );
    };
  const onChangeMemoStart = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const memoId = await createMemoAsync();
    updateMemoDescriptionMutation({
      id: memoId,
      memo_description: event.target.value,
    });
  };

  useEffect(() => {
    if (data) {
      setMemoList(data);
    }
  }, [data]);

  return {
    memoList,
    error,
    isLoading,
    isCreating,
    isUpdatingName,
    isUpdatingDescription,
    isDeleting,
    onClickCreateMemo,
    onClickDeleteMemo,
    onChangeMemoName,
    onChangeMemoDescription,
    onChangeMemoStart,
  };
}
