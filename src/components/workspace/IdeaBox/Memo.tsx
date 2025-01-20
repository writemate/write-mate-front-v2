"use client";
import MemoItem from "@/components/dashboard/Memo/MemoItem";
import { StateMessage } from "@/components/EmptyMessage";
import { useMemoItem } from "@/hooks/dashboard/memo/memoItem";
import { useMemoList } from "@/hooks/dashboard/memo/useMemoList";
import {
  MemoContent,
  MemoHeader,
  MemoTitle,
  CopyButton,
  AddButton,
} from "@/styles/workspace/IdeaBox.styles";
import { TMemo } from "@/utils/APIs/types";
import { copy } from "@/utils/copy";

export default function Memo() {
  const { memoList, error, isLoading, onClickAddMemo } = useMemoList();

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      {memoList &&
        memoList
          .slice()
          .reverse()
          .map((memo) => <MemoItem key={memo.id} memo={memo} />)}
      {error && <StateMessage messageKey="LOADING_ERROR" absolute />}
      {isLoading && <StateMessage messageKey="LOADING" absolute />}
      {memoList && memoList.length === 0 && (
        <StateMessage messageKey="MEMO_EMPTY" absolute />
      )}
      <AddButton onClick={onClickAddMemo} />
    </>
  );
}

function MemoCardContent({ memo }: { memo: TMemo }) {
  const { onChangeName, onChangeDescription } = useMemoItem(memo);

  return (
    <>
      <MemoHeader>
        <MemoTitle
          value={memo.memo_name}
          onChange={onChangeName}
          placeholder="메모 이름을 입력하세요"
        />
        <CopyButton onClick={copy(memo.memo_description)} />
      </MemoHeader>
      <MemoContent
        value={memo.memo_description}
        onChange={onChangeDescription}
        maxRows={3}
        cacheMeasurements
        placeholder="메모 내용을 입력하세요"
      />
    </>
  );
}
