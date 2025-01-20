"use client";

import { notifySuccess } from "./showToast";

export const copy = (text: string) => async () => {
  if (!window.navigator.clipboard)
    throw new Error("Clipboard API not available");
  await window.navigator.clipboard.writeText(text);
  notifySuccess("클립보드에 내용이 복사되었습니다.");
};
