'use client';
import { useState, useRef, RefObject } from 'react';

//키워드 입력창(position:absolute)이 부모요소를 넘어가지 않도록 위치를 조정
const getLeftPositionOfMiniModal = (keywordListRef: RefObject<HTMLDivElement>, addButtonRef: RefObject<HTMLDivElement>) => {
  if (!keywordListRef.current || !addButtonRef.current) return 0;
  const keywordListRect = keywordListRef.current.getBoundingClientRect();
  const addButtonRect = addButtonRef.current.getBoundingClientRect();
  if(addButtonRect.left+320+10<keywordListRect.right) return 10;
  return keywordListRect.right - addButtonRect.left - 320;
}

export default function useMiniModal() {
  const keywordListRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLDivElement>(null);
  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const [miniKeywordInput, setMiniKeywordInput] = useState('');

  const openMiniModal = () => {
    setMiniModalOpen(true);
  }

  const onBlurredMiniModal = () => {
    setMiniModalOpen(false);
    setMiniKeywordInput('');
  }

  const onChangeMiniKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMiniKeywordInput(e.target.value);
  }

  const miniModalLeftPosition = getLeftPositionOfMiniModal(keywordListRef, addButtonRef);

  return {
    keywordListRef,
    addButtonRef,
    miniModalOpen,
    miniKeywordInput,
    openMiniModal,
    onBlurredMiniModal,
    onChangeMiniKeywordInput,
    miniModalLeftPosition,
  }
}
