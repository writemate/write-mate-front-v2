"use client";
import { ModalContainer } from "@/styles";

export default function Modal({
  closeModal,
  maxWidth,
  maxHeight,
  children,
}: {
  closeModal: (() => void) | ((e: React.MouseEvent<HTMLDivElement>) => void);
  children: React.ReactElement;
  maxWidth?: number | string;
  maxHeight?: number | string;
}) {
  const propagateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <ModalContainer onClick={closeModal}>
      <div onClick={propagateClick} style={{ maxWidth, maxHeight, height: "100%", overflowY: "auto" }}>
        {children}
      </div>
    </ModalContainer>
  );
}
