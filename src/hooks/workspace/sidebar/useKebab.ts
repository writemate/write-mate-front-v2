import { useState, useCallback } from "react";

export const useKebab = () => {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const openKebab = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsKebabOpen(true);
  }, []);
  const closeKebab = useCallback(() => setIsKebabOpen(false), []);
  return { isKebabOpen, openKebab, closeKebab };
}
