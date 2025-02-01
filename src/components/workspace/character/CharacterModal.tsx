"use client";
import {
  useCharacter,
  CharacterContext,
} from "@/hooks/workspace/character/character";
import Cover from "@/components/workspace/character/detail/Cover";
import Characteristics from "@/components/workspace/character/detail/Characteristics";
import Keywords from "@/components/workspace/character/detail/SelectedKeywordList";
import RelatedEvents from "@/components/workspace/character/detail/RelatedEvents";
import Modal from "@/components/Modal";
import { ModalContentAndFooterContainer } from "@/styles/dashboard/IdeaBox/Modal.style";
import { Infos } from "@/styles/workspace/Info.style";
import { CloseButton, DeleteButton } from "@/styles/Button";
import { Title, Subtitle } from "@/styles/workspace";

export default function CharacterModal({
  characterId,
  closeModal,
}: {
  characterId: string;
  closeModal: () => void;
}) {
  const value = useCharacter(characterId);
  const { data, isLoading, onChangeName, onChangeRole } = value;

  return (
    <Modal closeModal={closeModal} maxWidth="1024px" maxHeight="85vh">
      <ModalContentAndFooterContainer>
        <CharacterContext.Provider value={value}>
          <Title>
            <div
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <input
                type="text"
                placeholder="인물의 이름을 적어주세요"
                onChange={onChangeName}
                defaultValue={data?.ch_name}
                disabled={isLoading}
              />
              <CloseButton onClick={closeModal}>닫기</CloseButton>
            </div>
            <Subtitle>
              <input
                placeholder="작품 속 인물의 역할을 적어주세요"
                onChange={onChangeRole}
                defaultValue={data?.role}
                disabled={isLoading}
              />
            </Subtitle>
          </Title>
          <Cover />
          <Infos>
            <Characteristics />
            <Keywords />
            <RelatedEvents />
          </Infos>
        </CharacterContext.Provider>
      </ModalContentAndFooterContainer>
    </Modal>
  );
}
