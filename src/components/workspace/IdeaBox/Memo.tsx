"use client";
import {
  MemoContent,
  MemoCard,
  MemoHeader,
  MemoTitle,
  CopyButton,
  AddButton,
} from "@/styles/workspace/IdeaBox.styles";
import useIdeaBoxMemo from "@/hooks/dashboard/useIdeaBoxMemo";
import { copy } from "@/utils/copy";

export default function Memo() {
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
  } = useIdeaBoxMemo();

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
    <>
      {memoList &&
        memoList.map((memo) => (
          <MemoCard key={memo.id}>
            <MemoHeader>
              <MemoTitle
                value={memo.memo_name}
                onChange={onChangeMemoName(memo.id)}
                placeholder="메모 이름을 입력하세요"
              />
              <CopyButton onClick={copy(memo.memo_description)} />
            </MemoHeader>
            <MemoContent
              value={memo.memo_description}
              onChange={onChangeMemoDescription(memo.id)}
              maxRows={3}
              cacheMeasurements
              placeholder="메모 내용을 입력하세요"
            />
          </MemoCard>
        ))}
      {isCreating && <div>메모를 생성하는 중...</div>}
      <AddButton onClick={onClickCreateMemo} />
    </>
  );
}
