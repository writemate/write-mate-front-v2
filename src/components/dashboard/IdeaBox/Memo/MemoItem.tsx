"use client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  MemoCard,
  MemoContent,
  MemoHeader,
  MemoTitle,
  MemoUpdatedDate,
} from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";

export default function MemoItem({ memoId }: { memoId: string }) {
  const { memoList, error, isLoading } =
    useContext(DashboardContext).ideaBoxMemo;
  const { selectedMemo, onClickMemoTitle, onClickMemoContent } =
    useContext(DashboardContext).memoModal;

  const memo = memoList.find((memo) => memo.id === memoId);

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  const getTempName = () => {
    if (!memo) return "";
    if (!memo.memo_name || memo.memo_name.length === 0) {
      if (!memo.memo_description || memo.memo_description.length === 0) {
        return "";
      }
      return memo.memo_description.replace(" ", "").slice(0, 13) + "...";
    }
    if (memo.memo_name.length > 13) {
      return memo.memo_name.slice(0, 13) + "...";
    }
    return memo.memo_name;
  };

  return (
    <>
      {memo && (
        <MemoCard $isSelected={memo.id === selectedMemo?.id}>
          <MemoHeader>
            <MemoTitle
              value={getTempName()}
              placeholder="메모 이름을 입력하세요"
              readOnly={true}
              onClick={onClickMemoTitle(memo)}
            />
          </MemoHeader>
          <MemoContent
            value={memo.memo_description}
            placeholder="메모 내용을 입력하세요"
            maxRows={6}
            readOnly={true}
            onClick={onClickMemoContent(memo)}
          />
          <MemoUpdatedDate>
            {new Date(memo.updatedAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </MemoUpdatedDate>
        </MemoCard>
      )}
    </>
  );
}
