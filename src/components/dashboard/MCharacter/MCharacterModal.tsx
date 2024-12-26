"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import Footer from "@/components/dashboard/MCharacter/ModalFooter";
import {
  ModalContentAndFooterContainer,
  ModalContentContainer,
  ImgAndNameAndDescriptionContainer,
  NameAndDescriptionContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import Image from "@/components/dashboard/MCharacter/Image";
import Name from "@/components/dashboard/MCharacter/Name";
import BirthAndGender from "@/components/dashboard/MCharacter/BirthAndGender";
import Role from "@/components/dashboard/MCharacter/Role";
import Description from "@/components/dashboard/MCharacter/Description";
import Characteristic from "@/components/dashboard/MCharacter/Characteristic";

export default function MCharacterModal() {
  const { isOpenEditModal, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeEditModal} maxWidth="700px">
          <ModalContentAndFooterContainer>
            <ModalContentContainer>
              <ImgAndNameAndDescriptionContainer>
                <Image />
                <NameAndDescriptionContainer>
                  <Name />
                  <Role />
                </NameAndDescriptionContainer>
              </ImgAndNameAndDescriptionContainer>
              <BirthAndGender />
              <Description />
              <Characteristic />
            </ModalContentContainer>
            <Footer />
          </ModalContentAndFooterContainer>
        </Modal>
      )}
    </>
  );
}
