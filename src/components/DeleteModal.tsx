"use client";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import {
  BackGroundContainer,
  ButtonContainer,
  DangerIcon,
  ModalButton,
  ModalContainer,
} from "@/styles/DeleteModal";
import { useContext } from "react";
import { useWork } from "@/hooks/dashboard/useWork";

export default function DeleteModal() {
  const {
    openDeleteModal,
    setOpenDeleteModal,
    isDeleting,
    setIsDeleting,
    data,
  } = useContext(DashboardContext);
  const { onChangeCategory, work } = useWork(isDeleting);

  return (
    <>
      {openDeleteModal && (
        <BackGroundContainer>
          <ModalContainer>
            <DangerIcon />
            <p>정말 삭제하시겠습니까?</p>
            <ButtonContainer>
              <ModalButton
                $isDanger={true}
                onClick={() => {
                  onChangeCategory("trash");
                  setOpenDeleteModal(false);
                  setIsDeleting("");
                }}
              >
                삭제
              </ModalButton>
              <ModalButton
                $isDanger={false}
                onClick={() => setOpenDeleteModal(false)}
              >
                취소
              </ModalButton>
            </ButtonContainer>
          </ModalContainer>
        </BackGroundContainer>
      )}
    </>
  );
}
