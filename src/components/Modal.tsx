'use client';
import { ModalContainer } from "@/styles";

export default function Modal({ setIsOpen,maxWidth,maxHeight, children } : { setIsOpen: (isOpen: boolean) => void, children: React.ReactNode, maxWidth?: number, maxHeight?: number }) {
  const closeModal = () => setIsOpen(false);
  const propagateClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();
  return (
    <ModalContainer onClick={closeModal}>
      <div onClick={propagateClick} style={{ maxWidth, maxHeight }}>
        {children}
      </div>
    </ModalContainer>
  );
}
