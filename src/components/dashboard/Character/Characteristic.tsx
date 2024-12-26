import { CharacterItemContext } from "@/hooks/dashboard/character/characterItem";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

import {
  AddCharacteristicButton,
  CharacteristicCard,
  CharateristicHeader,
  Input,
  TextArea,
  Delete,
} from "@/styles/dashboard/IdeaBox/Modal";
import { CharacteristicListContainer } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";
import { WarningModal } from "../WarningModal";

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
    <>
      <p>특징</p>
      <CharacteristicListContainer>
        {characteristicList &&
          characteristicList.map((c, i) => (
            <CharacteristicCard key={i}>
              <CharateristicHeader>
                <Input
                  value={c.title}
                  placeholder="특징을 적어주세요."
                  onChange={onChangeCharacteristicTitle(i)}
                />
                <Delete onClick={onClickOpenDeleteModal(i)} />
                {isOpenDeleteModal && deleteCharacteristic == i && (
                  <WarningModal
                    closeModal={closeDeleteModal}
                    onClickConfirm={onDeleteCharacteristic(i)}
                    onClickCancel={closeDeleteModal}
                    message="정말로 삭제하시겠습니까?"
                    ConfirmButtonName="삭제"
                  />
                )}
              </CharateristicHeader>
              <TextArea
                value={c.content}
                placeholder="성격이나, 외향적 특징, 출생의 비밀 등 세부 내용을 적어주세요."
                onChange={onChangeCharacteristicContent(i)}
              />
            </CharacteristicCard>
          ))}
        <AddCharacteristicButton onClick={onClickAddCharacteristic}>
          특징 추가
        </AddCharacteristicButton>
      </CharacteristicListContainer>
    </>
  );
}
