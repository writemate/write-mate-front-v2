'use client';
import { useState } from 'react';

enum IdeaBoxType {
  memo,
  character,
  event,
}

export const useIdeaBox = () => {
  const [sidebarType, setSidebarType] = useState<IdeaBoxType| null>(null);

  const select = (type: IdeaBoxType) => () => setSidebarType(type);

  const selectMemo = select(IdeaBoxType.memo);
  const selectCharacter = select(IdeaBoxType.character);
  const selectEvent = select(IdeaBoxType.event);

  const isMemoSelected = sidebarType === IdeaBoxType.memo;
  const isCharacterSelected = sidebarType === IdeaBoxType.character;
  const isEventSelected = sidebarType === IdeaBoxType.event;

  return { selectMemo, selectCharacter, selectEvent, isMemoSelected, isCharacterSelected, isEventSelected };
};
