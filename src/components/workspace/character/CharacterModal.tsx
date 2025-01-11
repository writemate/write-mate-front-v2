"use client";
import {
  useCharacter,
  CharacterContext,
} from "@/hooks/workspace/character/character";
import Cover from "@/components/workspace/character/detail/Cover";
import Description from "@/components/workspace/character/detail/Description";
import BirthDayAndGender from "@/components/workspace/character/detail/BirthDayAndGender";
import Characteristics from "@/components/workspace/character/detail/Characteristics";
import Keywords from "@/components/workspace/character/detail/SelectedKeywordList";
import RelatedEvents from "@/components/workspace/character/detail/RelatedEvents";
import Modal from "@/components/Modal";

import { SubTitle } from "@/styles/workspace/Info.style";
import {
  ModalContentAndFooterContainer,
  ModalTitle,
} from "@/styles/dashboard/IdeaBox/Modal";
import { Infos } from "@/styles/workspace/Info.style";
import { CloseButton, DeleteButton } from "@/styles";

export default function CharacterModal({
  characterId,
  closeModal,
}: {
  characterId: string;
  closeModal: () => void;
}) {
  const value = useCharacter(characterId);

  return (
    <Modal closeModal={closeModal} maxWidth={820} maxHeight="90vh">
      <ModalContentAndFooterContainer>
        <CharacterContext.Provider value={value}>
          <ModalTitle>
            <SubTitle>인물 정보</SubTitle>
            <CloseButton onClick={closeModal} style={{ marginLeft: "auto" }}>
              닫기
            </CloseButton>
          </ModalTitle>
          <Cover isDeletable={false} />
          <Infos>
            <Description />
            <BirthDayAndGender />
            <Characteristics />
            <Keywords />
            <RelatedEvents />
          </Infos>
          <DeleteButton
            onClick={value.onClickDeleteCharacter}
            style={{ marginLeft: "auto", marginBottom: "auto" }}
          >
            삭제하기
          </DeleteButton>
        </CharacterContext.Provider>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
