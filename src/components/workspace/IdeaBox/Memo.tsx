"use client";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { StateMessage } from "@/components/EmptyMessage";
import { useMemoItem } from "@/hooks/dashboard/memo/memoItem";
import { useMemoList } from "@/hooks/dashboard/memo/useMemoList";
import { MemoCard } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";
import {
  MemoContent,
  MemoHeader,
  MemoTitle,
  CopyButton,
  AddButton,
} from "@/styles/workspace/IdeaBox.styles";
import { TMemo } from "@/utils/APIs/types";
import { copy } from "@/utils/copy";

export default function Memo() {
  const { memoList, error, isLoading, onClickAddMemo } = useMemoList();

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      <MemoCard
        onClick={onClickAddMemo}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "80px",
          flexShrink: 0,
        }}
      >
        <AddButton />
      </MemoCard>
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
    </>
  );
}
