'use client';

export const copy = (text: string) => async () => {
  if(!window.navigator.clipboard) throw new Error('Clipboard API not available');
  await window.navigator.clipboard.writeText(text);
};
