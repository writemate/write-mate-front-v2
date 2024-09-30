'use client';
import { useState } from 'react';

enum TabType {
  character,
  relation,
}

export const useTab = () => {
  const [tabType, setTabType] = useState<TabType>(TabType.character);

  const select = (type: TabType) => () => setTabType(type);

  const selectCharacter = select(TabType.character);
  const selectRelation = select(TabType.relation);

  const isCharacterOpen = tabType === TabType.character;
  const isRelationOpen = tabType === TabType.relation;

  return { selectCharacter, selectRelation, isCharacterOpen, isRelationOpen };
};
