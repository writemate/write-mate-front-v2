"use client";
import { useContext } from "react";

import Modal from "@/components/Modal";
import Characteristic from "@/components/workspace/character/detail/Characteristics";
import { ModalContentAndFooterContainer } from "@/styles/dashboard/IdeaBox/Modal.style";
import { WarningModal } from "../WarningModal";
import { CloseButton, DeleteButton } from "@/styles/Button";
import { Subtitle, Title } from "@/styles/workspace";
import Cover from "@/components/workspace/character/detail/Cover";
import { CharacterContext } from "@/hooks/workspace/character/character";
import { useWarningModal } from "@/hooks/common/useWarningModal";

export default function MCharacterModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const {
    data,
    isLoading,
    onChangeName,
    onChangeRole,
    onClickDeleteCharacter,
  } = useContext(CharacterContext);
  const {
    isOpenDeleteModal,
    onOpenModal,
    closeModal: closeDeleteModal,
  } = useWarningModal();
  return (
    <Modal closeModal={closeModal} maxWidth="1024px" maxHeight="80vh">
      <ModalContentAndFooterContainer>
        <Title>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <input
              className="name"
              defaultValue={data?.ch_name}
              onChange={onChangeName}
              placeholder="인물의 이름을 입력하세요."
              disabled={isLoading}
              autoFocus
            />
            <DeleteButton onClick={onOpenModal}>삭제</DeleteButton>
            {isOpenDeleteModal && (
              <WarningModal
                closeModal={closeDeleteModal}
                onClickConfirm={onClickDeleteCharacter}
                onClickCancel={closeDeleteModal}
                message="정말로 삭제하시겠습니까?"
                ConfirmButtonName="삭제"
              />
            )}
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </div>
          <Subtitle>
            <input
              className="role"
              defaultValue={data?.role}
              onChange={onChangeRole}
              placeholder="인물의 역할을 입력하세요."
              disabled={isLoading}
            />
          </Subtitle>
        </Title>
        <Cover />
        <Characteristic />
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
