"use client";
import { MemoListContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMemoButton } from "@/components/dashboard/AddButton";
import { MemoListContext, useMemoList } from "@/hooks/dashboard/memo/memoList";

export default function MemoList() {
  const memoListValue = useMemoList();
  const { memoList, error, isLoading } = memoListValue;

  return (
    <MemoListContext.Provider value={memoListValue}>
      <MemoListContainer>
        {memoList &&
          memoList
            .slice()
            .reverse()
            .map((memo) => <MemoItem key={memo.id} memo={memo} />)}
        {error && <Error />}
        {isLoading && <Loading />}
      </MemoListContainer>
      <AddMemoButton />
    </MemoListContext.Provider>
  );
}

function Error() {
  return (
    <LoadingMessage>
      에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해 문의해주세요.
    </LoadingMessage>
  );
}

function Loading() {
  return <LoadingMessage>로딩 중...</LoadingMessage>;
}

function Creating() {
  return <LoadingMessage>메모를 생성하는 중...</LoadingMessage>;
}
