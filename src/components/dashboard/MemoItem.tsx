"use client";
import { IdeaBoxContext } from "@/hooks/dashboard/ideaBox";
import {
  MemoCard,
  MemoContent,
  MemoHeader,
  MemoTitle,
  OpenButton,
} from "@/styles/dashboard/MemoList";
import React, { forwardRef, use, useContext, useEffect, useRef } from "react";

export default function MemoItem({ memoId }: { memoId: string }) {
  const {
    memoList,
    error,
    isLoading,
    onChangeMemoName,
    onChangeMemoDescription,
  } = useContext(IdeaBoxContext);
  const memo = memoList.find((memo) => memo.id === memoId);

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      {memo && (
        <MemoCard className="memo-card">
          <MemoHeader>
            <MemoTitle
              value={memo.memo_name}
              onChange={onChangeMemoName(memo.id)}
              placeholder="메모 이름을 입력하세요"
            />
            <OpenButton />
          </MemoHeader>
          <MemoContent
            value={memo.memo_description}
            onChange={onChangeMemoDescription(memo.id)}
            placeholder="메모 내용을 입력하세요"
          />
        </MemoCard>
      )}
    </>
  );
}
