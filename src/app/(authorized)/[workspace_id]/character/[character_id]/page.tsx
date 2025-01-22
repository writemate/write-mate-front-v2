"use client";
import { BackButton } from "@/styles/workspace/Info.style";
import { Infos } from "@/styles/workspace/Info.style";
import Cover from "@/components/workspace/character/detail/Cover";
import Characteristics from "@/components/workspace/character/detail/Characteristics";
import Keywords from "@/components/workspace/character/detail/SelectedKeywordList";
import RelatedEvents from "@/components/workspace/character/detail/RelatedEvents";
import {
  useCharacter,
  CharacterContext,
} from "@/hooks/workspace/character/character";
import { Title, Subtitle } from "@/styles/workspace";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { DeleteButton } from "@/styles/Button";
import { WarningModal } from "@/components/dashboard/WarningModal";

export default function Character() {
  const value = useCharacter();
  const {
    data,
    isLoading,
    onChangeName,
    onChangeRole,
    onClickDeleteCharacter,
  } = value;
  const { isOpenDeleteModal, onOpenModal, closeModal } = useWarningModal();

  return (
    <CharacterContext.Provider value={value}>
      {/* <BackButton onClick={() => history.back()} /> */

      <Title>
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
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
              삭제하기
            </DeleteButton>
          }
          {isOpenDeleteModal && (
            <WarningModal
              closeModal={closeModal}
              onClickConfirm={onClickDeleteCharacter}
              onClickCancel={closeModal}
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
  );
}
