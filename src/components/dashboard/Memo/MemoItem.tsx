"use client";
import { useMemoModal } from "@/hooks/dashboard/memo/useMemoModal";
import {
  MemoCard,
  MemoContent,
  MemoHeader,
  MemoTitle,
  MemoUpdatedDate,
} from "@/styles/dashboard/IdeaBox/Memo/MemoList";
import { TMemo } from "@/utils/APIs/types";
import MemoModal from "./MemoModal";

export default function MemoItem({ memo }: { memo: TMemo }) {
  const { isOpenEditModal, onClickMemoTitle, onClickMemoContent } =
    useMemoModal(memo.id);

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
        <MemoCard $isSelected={isOpenEditModal}>
          <MemoHeader>
            <MemoTitle
              value={getTempName()}
              placeholder="메모 이름을 입력하세요"
              readOnly={true}
              onClick={onClickMemoTitle}
            />
          </MemoHeader>
          <MemoContent
            value={memo.memo_description}
            placeholder="메모 내용을 입력하세요"
            maxRows={6}
            readOnly={true}
            onClick={onClickMemoContent}
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
          {isOpenEditModal && <MemoModal />}
        </MemoCard>
      )}
    </>
  );
}
