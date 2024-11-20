"use client";

import { useMemo } from "@/hooks/dashboard/useMemo";
import {
  MemoListContainer,
  MemoCard,
  MemoContent,
  MemoHeader,
  MemoTitle,
  AddMemoButton,
  OpenButton,
} from "@/styles/dashboard/MemoList";
import { TMemo } from "@/utils/APIs/types";
import { useEffect, useState } from "react";

export default function MemoList() {
  const {
    memoList,
    error,
    isLoading,
    isCreating,
    isDeleting,
    onClickCreateMemo,
    onClickDeleteMemo,
    onChangeMemoName,
    onChangeMemoDescription,
    onChangeMemoStart,
  } = useMemo();

  const [columns, setColumns] = useState<TMemo[][]>([[], [], []]); // 3개의 열로 초기화

  // 메모를 열에 배치
  useEffect(() => {
    if (memoList) {
      const newColumns: TMemo[][] = [[], [], []];
      memoList
        .slice()
        .reverse()
        .forEach((memo, index) => {
          newColumns[index % 3].push(memo); // 나머지를 이용해 열에 분배
        });
      setColumns(newColumns);
    }
  }, [memoList]);

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      <MemoListContainer>
        {columns.map((column, colIndex) => (
          <div className="column" key={colIndex}>
            {column.map((memo) => (
              <MemoCard key={memo.id}>
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
            ))}
          </div>
        ))}
        {isCreating && <div>메모를 생성하는 중...</div>}
        <AddMemoButton onClick={onClickCreateMemo}>메모 추가</AddMemoButton>
      </MemoListContainer>
    </>
  );
}
