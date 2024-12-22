import { DashboardContext } from "@/hooks/dashboard/work/dashboard";

import { AddCharacteristicButton, CharacteristicCard, CharateristicHeader, Input, TextArea, Delete } from "@/styles/dashboard/IdeaBox/Modal";
import { CharacteristicListContainer } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function Characterisitc() {
  const { characteristicList, onClickAddCharacteristic, onChangeSelectedMCharacterCharacteristicTitle, onChangeSelectedMCharacterCharacteristicContent } =
    useContext(DashboardContext).memoCharacterModal;

  const { onClickDeleteMCharacterCharacteristic } = useContext(DashboardContext).removeConfirmationModal;

  return (
    <>
      <p>특징</p>
      <CharacteristicListContainer>
        {characteristicList &&
          characteristicList.map((characteristic, index) => (
            <CharacteristicCard key={index}>
              <CharateristicHeader>
                <Input
                  className={`characteristic ${2 * index - 1}`}
                  value={characteristic.title}
                  placeholder="특징을 적어주세요."
                  onChange={onChangeSelectedMCharacterCharacteristicTitle(index)}
                />
                <Delete onClick={onClickDeleteMCharacterCharacteristic(index)} />
              </CharateristicHeader>
              <TextArea
                className={`characteristic ${2 * index}`}
                value={characteristic.content}
                placeholder="성격이나, 외향적 특징, 출생의 비밀 등 세부 내용을 적어주세요."
                onChange={onChangeSelectedMCharacterCharacteristicContent(index)}
              />
            </CharacteristicCard>
          ))}
        <AddCharacteristicButton onClick={onClickAddCharacteristic}>특징 추가</AddCharacteristicButton>
      </CharacteristicListContainer>
    </>
  );
}
