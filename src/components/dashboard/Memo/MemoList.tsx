"use client";
import { MemoListContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { AddMemoButton } from "@/components/dashboard/AddButton";
import { useMemoList } from "@/hooks/dashboard/memo/useMemoList";

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
        {error && <Error />}
        {isLoading && <Loading />}
        {memoList && memoList.length === 0 && (
          <LoadingMessage>메모가 없습니다.</LoadingMessage>
        )}
      </MemoListContainer>
      <AddMemoButton />
    </>
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
