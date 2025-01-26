"use client";
import { useContext, useState } from "react";
import { CharacterContext } from "@/hooks/workspace/character/character";
import TrashCan from "@/assets/icons/trashcan.svg";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import {
  CharacteristicContainer,
  CharacteristicTitle,
  CharacteristicContent,
  CharacteristicAdd,
  CharacteristicListContainer,
} from "@/styles/workspace/Character.style";
import { WarningModal } from "@/components/dashboard/WarningModal";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { StateMessage } from "@/components/EmptyMessage";

export default function Description() {
  const {
    isLoading,
    onClickAddCharacteristic,
    characteristicList,
    onClickRemoveCharacteristic,
    onChangeCharacteristicTitle,
    onChangeCharacteristicContent,
  } = useContext(CharacterContext);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const isOpenDeleteModal = deletingIndex !== null;
  const openWarningModal = (index: number) => () => setDeletingIndex(index);
  const closeWarningModal = () => setDeletingIndex(null);

  return (
    <Container>
      <SubTitle>특징</SubTitle>
      <CharacteristicListContainer>
        {characteristicList.map((c, i) => (
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
                placeholder="특징을 적어주세요."
                value={c.title}
                onChange={onChangeCharacteristicTitle(i)}
                onKeyDown={(e) => {
                  if (e.nativeEvent.isComposing) return;
                  if (e.key === "Enter") {
                    e.preventDefault();
                    (
                      (e.target as HTMLInputElement).parentElement
                        ?.nextElementSibling as HTMLTextAreaElement
                    ).focus();
                  }
                }}
                disabled={isLoading}
              />
              <TrashCan
                onClick={openWarningModal(i)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <CharacteristicContent
              placeholder="성격이나, 외향적 특징, 출생의 비밀 등 세부 내용을 적어주세요."
              value={c.content}
              onChange={onChangeCharacteristicContent(i)}
              disabled={isLoading}
              rows={2}
            />
          </CharacteristicContainer>
        ))}
        {isOpenDeleteModal && (
          <WarningModal
            closeModal={closeWarningModal}
            onClickConfirm={() => {
              onClickRemoveCharacteristic(deletingIndex)();
              closeWarningModal();
            }}
            onClickCancel={closeWarningModal}
            message={"인물를 삭제하시겠습니까?"}
            ConfirmButtonName={"삭제"}
          />
        )}
        {characteristicList.length === 0 && (
          <StateMessage messageKey="CHARACTERISTIC_EMPTY" />
        )}
        <CharacteristicAdd
          onClick={onClickAddCharacteristic}
          disabled={isLoading}
        >
          특징 추가하기
        </CharacteristicAdd>
      </CharacteristicListContainer>
    </Container>
  );
}
