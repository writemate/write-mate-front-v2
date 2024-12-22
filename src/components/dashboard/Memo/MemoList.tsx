"use client";
import { MemoListContainer } from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";
import { AddMemoButton } from "@/components/dashboard/AddButton";

export default function MemoList() {
  const { memoList, error, isLoading } = useContext(DashboardContext).ideaBoxMemo;

  return (
    <MemoListContainer>
      {error && <Error />}
      {isLoading && <Loading />}
      {memoList
        .slice()
        .reverse()
        .map((memo) => (
          <MemoItem key={memo.id} memoId={memo.id} />
        ))}
      <AddMemoButton />
    </MemoListContainer>
  );
}

function Error() {
  return <LoadingMessage>에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해 문의해주세요.</LoadingMessage>;
}

function Loading() {
  return <LoadingMessage>로딩 중...</LoadingMessage>;
}

function Creating() {
  return <LoadingMessage>메모를 생성하는 중...</LoadingMessage>;
}
