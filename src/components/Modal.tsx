'use client';
import { ModalContainer } from "@/styles";

export default function Modal({ closeModal,maxWidth,maxHeight, children } : { closeModal: ()=>void|((e: React.MouseEvent<HTMLDivElement>)=>void),
  children: React.ReactNode, maxWidth?: number, maxHeight?: number }) {
  const propagateClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();
  return (
    <ModalContainer onClick={closeModal}>
      <div onClick={propagateClick} style={{ maxWidth, maxHeight }}>
        {children}
      </div>
    </ModalContainer>
  );
}
