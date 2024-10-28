'use client';
import { useState } from 'react';

enum IdeaBoxType {
  memo,
  character,
}

export const useIdeaBox = () => {
  const [sidebarType, setSidebarType] = useState<IdeaBoxType>(IdeaBoxType.memo);

  const select = (type: IdeaBoxType) => () => setSidebarType(type);

  const selectMemo = select(IdeaBoxType.memo);
  const selectCharacter = select(IdeaBoxType.character);

  const isMemoSelected = sidebarType === IdeaBoxType.memo;
  const isCharacterSelected = sidebarType === IdeaBoxType.character;

  return { selectMemo, selectCharacter, isMemoSelected, isCharacterSelected };
};
