"use client";
import { IdeaBoxContext } from "@/hooks/dashboard/ideaBox";
import {
  MemoListContainer,
  AddMemoButton,
  HiddenMemoListContainer,
} from "@/styles/dashboard/MemoList";
import { useContext } from "react";
import MemoItem from "@/components/dashboard/MemoItem";

export default function MemoList() {
  const {
    memoList,
    error,
    isLoading,
    isCreating,
    onClickCreateMemo,
    columns,
    containerRef,
  } = useContext(IdeaBoxContext);

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      <HiddenMemoListContainer ref={containerRef}>
        {columns.map((column, colIndex) => (
          <div className="column" key={colIndex}>
            {colIndex == 0 &&
              memoList.map((memo) => (
                <MemoItem key={memo.id} memoId={memo.id} />
              ))}
          </div>
        ))}
      </HiddenMemoListContainer>
      <MemoListContainer>
        {columns.map((column, colIndex) => (
          <div className="column" key={colIndex}>
            {column
              .slice()
              .reverse()
              .map((memo) => (
                <MemoItem key={memo.id} memoId={memo.id} />
              ))}
          </div>
        ))}
        {isCreating && <div>메모를 생성하는 중...</div>}
        <AddMemoButton onClick={onClickCreateMemo}>메모 추가</AddMemoButton>
      </MemoListContainer>
    </>
  );
}
