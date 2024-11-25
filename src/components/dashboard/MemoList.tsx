"use client";
import { MemoListContainer, AddMemoButton } from "@/styles/dashboard/MemoList";
import { useContext } from "react";
import MemoItem from "@/components/dashboard/MemoItem";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { LoadingMessage } from "@/styles/dashboard/Loading";

export default function MemoList() {
  const { memoList, error, isLoading, isCreating, onClickCreateMemo } =
    useContext(DashboardContext).ideaBox;
  const { openNewMemoEditModal } = useContext(DashboardContext).memoModal;

  return (
    <>
      <MemoListContainer>
        {error && (
          <LoadingMessage>
            에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해
            문의해주세요.
          </LoadingMessage>
        )}
        {isLoading && <LoadingMessage>메모를 불러오는 중...</LoadingMessage>}
        {memoList
          .slice()
          .reverse()
          .map((memo) => (
            <MemoItem key={memo.id} memoId={memo.id} />
          ))}
        {isCreating && <div>메모를 생성하는 중...</div>}
        <AddMemoButton
          onClick={() => {
            onClickCreateMemo();
            openNewMemoEditModal();
          }}
        >
          메모 추가
        </AddMemoButton>
      </MemoListContainer>
    </>
  );
}
