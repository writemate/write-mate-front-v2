import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { AddCharacteristicButton } from "@/styles/dashboard/IdeaBox/Modal";
import { CharacteristicListContainer } from "@/styles/dashboard/IdeaBox/Modal";
import { useContext } from "react";

export default function Characterisitc() {
  const {
    selectedMCharacter,
    onClickAddCharacteristic,
    onClickDeleteCharacteristic,
  } = useContext(DashboardContext).memoCharacterModal;
  if (selectedMCharacter.id === "") {
    return null;
  }

  return (
    <>
      <p>설정</p>
      <CharacteristicListContainer>
        {selectedMCharacter.characteristic &&
          selectedMCharacter.characteristic.map((characteristic, index) => (
            <div key={index}>
              <input
                defaultValue={characteristic.title}
                placeholder="설정 종류을 입력하세요."
              />
              <button onClick={onClickDeleteCharacteristic(index)}>삭제</button>
              <input
                defaultValue={characteristic.content}
                placeholder="설정을 입력하세요."
              />
            </div>
          ))}
        <AddCharacteristicButton onClick={onClickAddCharacteristic}>
          특징 추가
        </AddCharacteristicButton>
      </CharacteristicListContainer>
    </>
  );
}
