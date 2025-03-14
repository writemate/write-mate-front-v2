"use client";
import {
  MemoCard,
  MemoContent,
  MemoHeader,
  MemoTitle,
  MemoUpdatedDate,
} from "@/styles/dashboard/IdeaBox/Memo/MemoList.style";
import { TMemo } from "@/utils/APIs/types";
import { EditModal } from "./MemoModal";
import { MemoItemContext, useMemoItem } from "@/hooks/dashboard/memo/memoItem";
import { IconButton } from "@/styles/workspace/plot/Chapter.styles";
import { copy } from "@/utils/copy";
import CopyIcon from "@/assets/workspace/plot/copy.svg";

export default function MemoItem({ memo }: { memo: TMemo }) {
  const memoItemValue = useMemoItem(memo);
  const { isOpenEditModal, onClickMemoTitle, onClickMemoContent } =
    memoItemValue;

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
    <MemoItemContext.Provider value={memoItemValue}>
      <MemoCard $isSelected={isOpenEditModal}>
        <MemoHeader>
          <MemoTitle
            value={getTempName()}
            placeholder={memo.id ? "메모 이름을 입력하세요" : "메모 생성 중"}
            readOnly={true}
            onClick={memo.id ? onClickMemoTitle : undefined}
          />
          <IconButton type="button" onClick={copy(memo.memo_description)}>
            <CopyIcon />
          </IconButton>
        </MemoHeader>
        <MemoContent
          value={memo.memo_description}
          placeholder={memo.id ? "메모 내용을 입력하세요" : ""}
          maxRows={3}
          readOnly={true}
          onClick={memo.id ? onClickMemoContent : undefined}
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
      {isOpenEditModal && <EditModal />}
    </MemoItemContext.Provider>
  );
}
