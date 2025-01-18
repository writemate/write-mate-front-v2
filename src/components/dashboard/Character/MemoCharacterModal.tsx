"use client";
import { useContext } from "react";

import Modal from "@/components/Modal";
import Image from "@/components/dashboard/Character/Image";
import Name from "@/components/dashboard/Character/Name";
import BirthAndGender from "@/components/dashboard/Character/BirthAndGender";
import Role from "@/components/dashboard/Character/Role";
import Description from "@/components/dashboard/Character/Description";
import Characteristic from "@/components/dashboard/Character/Characteristic";

import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";

import {
  ModalContentAndFooterContainer,
  ModalTitle,
} from "@/styles/dashboard/IdeaBox/Modal.style";
import {
  CoverContainer,
  CoverContentsContainer,
  SubTitle,
} from "@/styles/workspace/Info.style";
import { Infos } from "@/styles/workspace/Info.style";
import { WarningModal } from "../WarningModal";
import { CloseButton, DeleteButton } from "@/styles";

export default function MCharacterModal() {
  const {
    closeEditModal,
    isOpenDeleteModal,
    closeDeleteModal,
    onClickOpenDeleteModal,
    onDeleteMCharacter,
    deleteCharacteristic,
  } = useContext(CharacterItemContext);

  return (
    <Modal closeModal={closeEditModal} maxWidth={820} maxHeight="90vh">
      <ModalContentAndFooterContainer>
        <ModalTitle>
          <SubTitle>인물 정보</SubTitle>
          <CloseButton onClick={closeEditModal} style={{ marginLeft: "auto" }}>
            닫기
          </CloseButton>
        </ModalTitle>
        <CoverContainer>
          <Image />
          <CoverContentsContainer>
            <Name />
            <Role />
          </CoverContentsContainer>
        </CoverContainer>
        <Infos>
          <Description />
          <BirthAndGender />
          <Characteristic />
        </Infos>
        <DeleteButton
          onClick={onClickOpenDeleteModal()}
          style={{ marginLeft: "auto", marginBottom: "auto" }}
        >
          삭제하기
        </DeleteButton>
        {isOpenDeleteModal && deleteCharacteristic == -1 && (
          <WarningModal
            closeModal={closeDeleteModal}
            onClickConfirm={onDeleteMCharacter}
            onClickCancel={closeDeleteModal}
            message="정말로 삭제하시겠습니까?"
            ConfirmButtonName="삭제"
          />
        )}
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
