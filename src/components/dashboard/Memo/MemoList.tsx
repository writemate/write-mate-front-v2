"use client";
import { MemoListContainer, AddMemoButton } from "@/styles/dashboard/MemoList";
import { useContext } from "react";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";

export default function MemoList() {
  const { memoList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMemo;

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
      <AddMemo />
      {memoList.length === 0 && <AddMemo />}
    </MemoListContainer>
  );
}

function AddMemo() {
  const { memoList, getNewlyCreatedMemo } =
    useContext(DashboardContext).ideaBoxMemo;
  const { onClickMemoContent } = useContext(DashboardContext).memoModal;
  const onClickAddMemo = async () => {
    const newMemo = await getNewlyCreatedMemo();
    if (!newMemo) return;
    onClickMemoContent(newMemo)();
  };

  return (
    <AddMemoButton $isEmpty={memoList.length === 0} onClick={onClickAddMemo}>
      메모 추가
    </AddMemoButton>
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
