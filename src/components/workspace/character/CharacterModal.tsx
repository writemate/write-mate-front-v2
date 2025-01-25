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
} from "@/styles/dashboard/IdeaBox/Modal.style";
import { Infos } from "@/styles/workspace/Info.style";
import { CloseButton } from "@/styles";
import { DeleteButton } from "@/styles/Button";
import { WarningModal } from "@/components/dashboard/WarningModal";
import { Title, Subtitle } from "@/styles/workspace";
import { useWarningModal } from "@/hooks/common/useWarningModal";

export default function CharacterModal({
  characterId,
  closeModal,
}: {
  characterId: string;
  closeModal: () => void;
}) {
  const value = useCharacter(characterId);
  const {
    data,
    isLoading,
    onChangeName,
    onChangeRole,
    onClickDeleteCharacter,
  } = value;
  const {
    isOpenDeleteModal,
    onOpenModal,
    closeModal: closeDeleteModal,
  } = useWarningModal();

  return (
    <Modal closeModal={closeModal} maxWidth={820} maxHeight="85vh">
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
              {
                <DeleteButton
                  onClick={onOpenModal}
                  style={{ marginLeft: "auto", marginBottom: "auto" }}
                >
                  삭제
                </DeleteButton>
              }
              {isOpenDeleteModal && (
                <WarningModal
                  closeModal={closeDeleteModal}
                  onClickConfirm={onClickDeleteCharacter}
                  onClickCancel={closeDeleteModal}
                  message={"인물를 삭제하시겠습니까?"}
                  ConfirmButtonName={"삭제"}
                />
              )}
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
