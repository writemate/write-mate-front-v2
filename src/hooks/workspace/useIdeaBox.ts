'use client';
import { useState } from 'react';

enum IdeaBoxType {
  memo,
  event,
}

export const useIdeaBox = () => {
  const [sidebarType, setSidebarType] = useState<IdeaBoxType>(IdeaBoxType.memo);

  const select = (type: IdeaBoxType) => () => setSidebarType(type);

  const selectMemo = select(IdeaBoxType.memo);
  const selectEvent = select(IdeaBoxType.event);

  const isMemoSelected = sidebarType === IdeaBoxType.memo;
  const isEventSelected = sidebarType === IdeaBoxType.event;

  return { selectMemo, selectEvent, isMemoSelected, isEventSelected };
};
