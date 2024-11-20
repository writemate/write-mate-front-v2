import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { ideaBoxCategory, TMemo } from "@/utils/APIs/types";
import {
  createMemo,
  deleteMemo,
  getMemoList,
  updaetMemoName,
  updateMemoDescription,
} from "@/utils/APIs/memo";
import { debounce } from "@/utils";

export function useIdeaBox() {
  const queryClient = useQueryClient();
  const [memoList, setMemoList] = useState<TMemo[]>([]);
  const [columns, setColumns] = useState<TMemo[][]>([]);
  const [numColumns, setNumColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ideaCategory, setIdeaCategory] = useState<
    keyof typeof ideaBoxCategory
  >(() => {
    if (typeof window !== "undefined") {
      const category = localStorage.getItem("ideaCategory");
      return category
        ? (category as (typeof ideaBoxCategory)[keyof typeof ideaBoxCategory])
        : "memo";
    }
    return "memo";
  });
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

  const calculateColumns = () => {
    const width = window.innerWidth;
    if (width > 1200) return 4;
    if (width > 800) return 3;
    if (width > 500) return 2;
    return 1;
  };

  const updateColumns = () => {
    console.log("updateColumns");
    const cols = calculateColumns();
    setNumColumns(cols);

    const newColumns: TMemo[][] = Array.from({ length: cols }, () => []);
    const columnHeights = Array(cols).fill(0);

    const memoElements =
      containerRef.current?.querySelectorAll(".memo-card") || [];

    memoElements.forEach((element, index) => {
      const memoHeight = (element as HTMLElement).offsetHeight;
      const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
      newColumns[minIndex].push(memoList[index]);
      columnHeights[minIndex] += memoHeight;
    });

    setColumns(newColumns);
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
  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [memoList]);

  return {
    ideaCategory,
    memoList,
    error,
    isLoading,
    isCreating,
    isUpdatingName,
    isUpdatingDescription,
    isDeleting,
    columns,
    containerRef,
    onClickCreateMemo,
    onClickDeleteMemo,
    onChangeMemoName,
    onChangeMemoDescription,
    onChangeMemoStart,
    handleIdeaCategoryChange,
  };
}

export const IdeaBoxContext = createContext(
  {} as ReturnType<typeof useIdeaBox>
);
