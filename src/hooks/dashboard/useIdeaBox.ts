import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { useCallback, useEffect, useState } from "react";
import { ideaBoxCategory, TMemo } from "@/utils/APIs/types";
import {
  createMemo,
  deleteMemo,
  getMemoList,
  updaetMemoName,
  updateMemoDescription,
} from "@/utils/APIs/memo";
import { debounce } from "@/utils";
import { notifySuccess } from "@/utils/showToast";

export default function useIdeaBox() {
  const queryClient = useQueryClient();
  const [ideaCategory, setIdeaCategory] = useState<
    keyof typeof ideaBoxCategory
  >(() => {
    if (typeof window == "undefined") return "memo";
    if (!localStorage.getItem("ideaCategory")) return "memo";
    return localStorage.getItem("ideaCategory") as keyof typeof ideaBoxCategory;
  });
  const [memoList, setMemoList] = useState<TMemo[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: memoQueryKeys.memoList(),
    queryFn: getMemoList,
  });
  const { mutate: createMemoMutation, isPending: isCreating } = useMutation({
    mutationFn: createMemo,
    onSuccess: (createdId) => {
      if (createdId) {
        console.log("Created Memo ID:", createdId); // 메모 ID 출력
      }
      queryClient.invalidateQueries({ queryKey: memoQueryKeys.memoList() });
      notifySuccess("메모가 생성되었습니다.");
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

  function handleIdeaCategoryChange(
    category: (typeof ideaBoxCategory)[keyof typeof ideaBoxCategory]
  ) {
    setIdeaCategory(category);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ideaCategory", ideaCategory);
    }
  }, [ideaCategory]);
  useEffect(() => {
    if (data) {
      setMemoList(data);
    }
  }, [data]);

  return {
    ideaCategory,
    memoList,
    error,
    isLoading,
    isCreating,
    isUpdatingName,
    isUpdatingDescription,
    isDeleting,
    setMemoList,
    onClickCreateMemo,
    onClickDeleteMemo,
    onChangeMemoName,
    onChangeMemoDescription,
    handleIdeaCategoryChange,
  };
}
