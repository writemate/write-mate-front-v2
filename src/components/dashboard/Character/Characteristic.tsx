"use client";
import { useContext } from "react";
import { WarningModal } from "../../WarningModal";
import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import {
  CharacteristicContainer,
  CharacteristicContent,
  CharacteristicAdd,
  CharacteristicListContainer,
  CharacteristicTitle,
} from "@/styles/workspace/Character.style";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import TrashCan from "@/assets/icons/trashcan.svg";

export default function Characterisitc() {
  const {
    characteristicList,
    onClickAddCharacteristic,
    onChangeCharacteristicTitle,
    onChangeCharacteristicContent,
    onClickOpenDeleteModal,
    isOpenDeleteModal,
    deleteCharacteristic,
    closeDeleteModal,
    onDeleteCharacteristic,
  } = useContext(CharacterItemContext);

  return (
    <Container>
      <SubTitle>특징</SubTitle>
      <CharacteristicListContainer>
        {characteristicList &&
          characteristicList.map((c, i) => (
            <CharacteristicContainer key={i}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                }}
              >
                <CharacteristicTitle
                  type="text"
                  value={c.title}
                  placeholder="특징을 적어주세요."
                  onChange={onChangeCharacteristicTitle(i)}
                />
                <TrashCan onClick={onClickOpenDeleteModal(i)} />
                {isOpenDeleteModal && deleteCharacteristic == i && (
                  <WarningModal
                    closeModal={closeDeleteModal}
                    onClickConfirm={onDeleteCharacteristic(i)}
                    onClickCancel={closeDeleteModal}
                    messageKey="characteristicDelete"
                    ConfirmButtonName="삭제"
                  />
                )}
              </div>
              <CharacteristicContent
                value={c.content}
                placeholder="성격이나, 외향적 특징, 출생의 비밀 등 세부 내용을 적어주세요."
                onChange={onChangeCharacteristicContent(i)}
                rows={2}
              />
            </CharacteristicContainer>
          ))}
        <CharacteristicAdd onClick={onClickAddCharacteristic}>
          특징 추가
        </CharacteristicAdd>
      </CharacteristicListContainer>
    </Container>
  );
}
