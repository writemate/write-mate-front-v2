import { useState, useCallback } from "react";

export const useKebab = () => {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [kebabPosition, setKebabPosition] = useState({ x: 0, y: 0 });
  const openKebab = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsKebabOpen(true);
    console.log(e);
    setKebabPosition({ x: e.clientX, y: e.clientY });
  }, []);
  const closeKebab = useCallback(() => setIsKebabOpen(false), []);
  return { isKebabOpen, openKebab, closeKebab };
}
