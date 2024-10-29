'use client';
import { MemoContent, MemoCard, MemoTitle, CopyButton } from "@/styles/workspace/IdeaBox.styles";
import { useMemo } from '@/hooks/workspace/useMemo';
import { copy } from '@/utils/copy';

export default function Memo() {
  const { data, isLoading, error } = useMemo();

  if (isLoading) return <div>메모를 불러오는 중...</div>;
  if (error) return <div>메모를 불러오는 중 에러가 발생했습니다.</div>;

  return (
      <>
          {data&&data.map((memo) => (
              <MemoCard key={memo.id}>
                  <MemoTitle>{memo.memo_name}</MemoTitle>
                  <CopyButton onClick={copy(memo.memo_description)}>복사</CopyButton>
                  <MemoContent>{memo.memo_description}</MemoContent>
              </MemoCard>
          ))}
      </>
  );
}
