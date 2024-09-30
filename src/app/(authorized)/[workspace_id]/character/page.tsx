'use client';
import { useTab } from '@/hooks/workspace/character/useTab';
import { Title } from '@/styles/workspace';

export default function Info() {
  const { selectCharacter, selectRelation, isCharacterOpen, isRelationOpen } = useTab();

  return (
      <>
        <Title>작품 속 인물</Title>
      </>
  );
}
