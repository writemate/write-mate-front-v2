"use client";
import { MemoListContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { AddMemoButton } from "@/components/dashboard/AddButton";
import { useMemoList } from "@/hooks/dashboard/memo/useMemoList";
import { StateMessage } from "@/components/EmptyMessage";

export default function MemoList() {
  const { memoList, error, isLoading } = useMemoList();

  return (
    <>
      <MemoListContainer>
        {memoList &&
          memoList
            .slice()
            .reverse()
            .map((memo) => <MemoItem key={memo.id} memo={memo} />)}
        {error && <StateMessage messageKey="LOADING_ERROR" absolute />}
        {isLoading && <StateMessage messageKey="LOADING" absolute />}
        {memoList && memoList.length === 0 && (
          <StateMessage messageKey="MEMO_EMPTY" absolute />
        )}
      </MemoListContainer>
      <AddMemoButton />
    </>
  );
}
