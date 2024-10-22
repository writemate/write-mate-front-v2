import useClickAway from "@/hooks/workspace/plot/useClickAway";
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
import showToastMessage from "@/hooks/workspace/plot/showToastMessage";
import { mockCharacterList, PlotCharacterType } from "@/utils/APIs/mock/plot";

interface CharacterModalProps {
  onClose: () => void;
  character: PlotCharacterType[];
}

export default function CharacterModal({
  onClose,
  character,
}: CharacterModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });

  const [selectCharacters, setSelectCharacter] =
    useState<PlotCharacterType[]>(character);

  // 자동연동
  const handleAutoChatacter = () => {};

  // 전체 캐릭터 리스트 가져오기
  //const { characterList } = useCharacterList();
  const characterList = mockCharacterList;
  console.log(selectCharacters, characterList);

  const remainingCharacters = characterList.filter(
    (character) =>
      !selectCharacters.some((selected) => selected.id === character.id)
  );

  // 캐릭터 선택
  const handleAddCharacter = () => {
    console.log("select");
    showToastMessage("인물이 추가되었습니다.", "success");
  };

  // 캐릭터 선택 취소
  const handleDeleteCharacter = () => {
    console.log("delete");
    showToastMessage("인물이 삭제되었습니다", "success");
  };

  return (
    <ModalContainer ref={ref}>
      <div>
        <AutoBtn onClick={handleAutoChatacter}>
          <Circulation style={{ marginRight: "6px" }} />
          자동 연동
        </AutoBtn>
        {selectCharacters.map((selectCharacter) => (
          <CharacterCheckBtn
            type="button"
            onClick={handleDeleteCharacter}
            key={selectCharacter.id}
          >
            <Check style={{ marginRight: "6px" }} />
            {selectCharacter.ch_name}
          </CharacterCheckBtn>
        ))}
      </div>
      <div>
        {remainingCharacters?.map((character) => (
          <CharacterDefaultBtn
            type="button"
            onClick={handleAddCharacter}
            key={character.id}
          >
            {character.ch_name}
          </CharacterDefaultBtn>
        ))}
      </div>
    </ModalContainer>
  );
}
