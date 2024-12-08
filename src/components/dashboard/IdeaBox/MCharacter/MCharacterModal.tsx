"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import Footer from "@/components/dashboard/IdeaBox/MCharacter/ModalFooter";
import {
  ModalContentAndFooterContainer,
  ModalContentContainer,
  ImgAndNameAndDescriptionContainer,
  NameAndDescriptionContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import Image from "@/components/dashboard/IdeaBox/MCharacter/Image";
import Name from "@/components/dashboard/IdeaBox/MCharacter/Name";
import BirthAndGender from "@/components/dashboard/IdeaBox/MCharacter/BirthAndGender";
import Role from "@/components/dashboard/IdeaBox/MCharacter/Role";
import Description from "@/components/dashboard/IdeaBox/MCharacter/Description";
import Characteristic from "@/components/dashboard/IdeaBox/MCharacter/Characteristic";

export default function MCharacterModal() {
  const { isOpenEditModal, closeEditModal } =
    useContext(DashboardContext).memoCharacterModal;

  return (
    <>
      {isOpenEditModal && (
        <Modal closeModal={closeEditModal} maxWidth="600px">
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
