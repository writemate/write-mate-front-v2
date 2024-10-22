import useClickAway from "@/hooks/workspace/plot/useClickAway";
import { TCharacter } from "@/utils/APIs/types";
import { useState } from "react";
import Circulation from "@/assets/workspace/characterModal/circulation.svg";
import Check from "@/assets/workspace/characterModal/check.svg";
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import {
  AutoBtn,
  CharacterCheckBtn,
  CharacterDefaultBtn,
  ModalContainer,
} from "@/styles/workspace/plot/CharacterModal.styles";

interface CharacterModalProps {
  onClose: () => void;
  character: TCharacter[];
}

export default function CharacterModal({
  onClose,
  character,
}: CharacterModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });
  const [selectCharacters, setSelectCharacter] =
    useState<TCharacter[]>(character);

  // 자동연동
  const handleAutoChatacter = () => {};

  // 전체 캐릭터 리스트 가져오기
  const { characterList } = useCharacterList();
  console.log(characterList);

  // 토스트알림

  // 캐릭터 선택
  const handleAddCharacter = () => {};

  // 캐릭터 선택 취소
  const handleDeleteCharacter = () => {};

  return (
    <ModalContainer ref={ref}>
      <div>
        <AutoBtn onClick={handleAutoChatacter}>
          <Circulation style={{ marginRight: "6px" }} />
          자동 연동
        </AutoBtn>
        {characterList?.map((character) => {
          return selectCharacters.map((selectCharacter) => {
            return (
              character._id === selectCharacter._id && (
                <CharacterCheckBtn
                  onClick={handleDeleteCharacter}
                  key={character._id}
                >
                  <Check style={{ marginRight: "6px" }} />
                  {character.ch_name}
                </CharacterCheckBtn>
              )
            );
          });
        })}
      </div>
      <div>
        {characterList?.map((character) => {
          return selectCharacters.map((selectCharacter) => {
            return (
              character._id !== selectCharacter._id && (
                <CharacterDefaultBtn
                  onClick={handleAddCharacter}
                  key={character._id}
                >
                  {character.ch_name}
                </CharacterDefaultBtn>
              )
            );
          });
        })}
      </div>
    </ModalContainer>
  );
}
