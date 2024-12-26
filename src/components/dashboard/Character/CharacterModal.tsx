"use client";
import { useContext } from "react";
import React from "react";
import Modal from "@/components/Modal";
import Footer from "@/components/dashboard/Character/ModalFooter";
import {
  ModalContentAndFooterContainer,
  ModalContentContainer,
  ImgAndNameAndDescriptionContainer,
  NameAndDescriptionContainer,
} from "@/styles/dashboard/IdeaBox/Modal";
import Image from "@/components/dashboard/Character/Image";
import Name from "@/components/dashboard/Character/Name";
import BirthAndGender from "@/components/dashboard/Character/BirthAndGender";
import Role from "@/components/dashboard/Character/Role";
import Description from "@/components/dashboard/Character/Description";
import Characteristic from "@/components/dashboard/Character/Characteristic";
import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";

export default function MCharacterModal() {
  const { closeEditModal } = useContext(CharacterItemContext);

  return (
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
  );
}
