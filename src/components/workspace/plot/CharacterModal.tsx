import useClickAway from "@/hooks/workspace/plot/useClickAway";
import { useEffect, useState } from "react";
import Circulation from "@/assets/workspace/characterModal/circulation.svg";
import Check from "@/assets/workspace/characterModal/check.svg";
import { useCharacterList } from "@/hooks/workspace/character/useCharacterList";
import {
  AutoBtn,
  CharacterCheckBtn,
  CharacterDefaultBtn,
  ModalContainer,
  SelectBtnWrapper,
} from "@/styles/workspace/plot/CharacterModal.styles";
import {
  CharacterListType,
  mockCharacterList,
  PlotCharacterType,
} from "@/utils/APIs/mock/plot";
import useModalCharacter from "@/hooks/workspace/plot/useModalCharacter";

interface CharacterModalProps {
  eventId: string;
  onClose: () => void;
  character: PlotCharacterType[];
}

export default function CharacterModal({
  eventId,
  onClose,
  character,
}: CharacterModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });

  const [selectCharacters, setSelectCharacters] =
    useState<PlotCharacterType[]>(character);

  const { addCharacterMutate, deleteCharacterMutate } =
    useModalCharacter(eventId);

  // 전체 캐릭터 리스트 가져오기
  //const { characterList } = useCharacterList();
  const characterList = mockCharacterList;

  const [remainingCharacters, setRemainingCharacters] =
    useState<CharacterListType[]>(characterList);

  useEffect(() => {
    // selectCharacters가 변경될 때마다 업데이트
    setRemainingCharacters(
      characterList.filter(
        (character) =>
          !selectCharacters.some((selected) => selected.id === character.id)
      )
    );
  }, [selectCharacters, characterList]);

  // 자동연동
  const handleAutoChatacter = () => {};

  // 캐릭터 선택
  const handleAddCharacter = (character: CharacterListType) => {
    // 타입 다르니까 맞춰서 넣어주기..
    const newCharacter: PlotCharacterType = {
      id: character.id,
      ch_image: character.ch_image,
      ch_name: character.ch_name,
    };
    setSelectCharacters((prev) => [...prev, newCharacter]);
    addCharacterMutate.mutate(character.id);
  };

  // 캐릭터 선택 취소
  const handleDeleteCharacter = (character: PlotCharacterType) => {
    setSelectCharacters((prev) => prev.filter((ch) => ch.id !== character.id));
    deleteCharacterMutate.mutate(character.id);
  };

  return (
    <ModalContainer ref={ref}>
      <SelectBtnWrapper>
        <AutoBtn onClick={handleAutoChatacter}>
          <Circulation style={{ marginRight: "6px" }} />
          자동 연동
        </AutoBtn>
        {selectCharacters.map((selectCharacter) => (
          <CharacterCheckBtn
            type="button"
            onClick={() => handleDeleteCharacter(selectCharacter)}
            key={selectCharacter.id}
          >
            <Check style={{ marginRight: "6px" }} />
            {selectCharacter.ch_name}
          </CharacterCheckBtn>
        ))}
      </SelectBtnWrapper>
      <div>
        {remainingCharacters?.map((character) => (
          <CharacterDefaultBtn
            type="button"
            onClick={() => handleAddCharacter(character)}
            key={character.id}
          >
            {character.ch_name}
          </CharacterDefaultBtn>
        ))}
      </div>
    </ModalContainer>
  );
}
