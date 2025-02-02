import Circulation from "@/assets/workspace/characterModal/circulation.svg";
import Check from "@/assets/workspace/characterModal/check.svg";
import {
  AutoBtn,
  CharacterCheckBtn,
  CharacterDefaultBtn,
  ModalContainer,
  MoveLink,
  SelectBtnWrapper,
} from "@/styles/workspace/plot/CharacterModal.styles";
import useSelectCharacterModal from "@/hooks/workspace/plot/useSelectCharacterModal";
import { TSimpleCharacter } from "@/utils/APIs/types";
import { useContext } from "react";
import {
  CharacterListContext,
  useCharacterList,
} from "@/hooks/workspace/character/characterList";
import { getCharacter } from "@/utils/APIs/workspace/character";
import { getName } from "@/utils/getCharacterName";
import { MoveToCharacter } from "../info/MainCharacter";

interface CharacterModalProps {
  chapterId: string;
  eventId: string;
  modalRef: React.RefObject<HTMLDivElement>;
  selectedCharacterList: TSimpleCharacter[];
}

export default function SelectCharacterModal({
  chapterId,
  eventId,
  modalRef,
  selectedCharacterList,
}: CharacterModalProps) {
  const { characterList, workspace_id } = useCharacterList();
  const {
    onSelectCharacterClick,
    onUnselectCharacterClick,
    remainingCharacters,
  } = useSelectCharacterModal(
    chapterId,
    eventId,
    selectedCharacterList,
    characterList || []
  );

  // 자동연동
  const handleAutoChatacter = () => {};

  return (
    <ModalContainer ref={modalRef}>
      <SelectBtnWrapper>
        {/* <AutoBtn onClick={handleAutoChatacter}>
          <Circulation style={{ marginRight: "6px" }} />
          자동 연동
        </AutoBtn> */}
        <MoveLink href={`/${workspace_id}/character`}>
          인물 생성하러 가기
        </MoveLink>
        {selectedCharacterList.map((selectCharacter) => (
          <CharacterCheckBtn
            type="button"
            onClick={onUnselectCharacterClick(selectCharacter.id)}
            key={selectCharacter.id}
          >
            <Check style={{ marginRight: "6px" }} />
            {getName(selectCharacter)}
          </CharacterCheckBtn>
        ))}
      </SelectBtnWrapper>
      <div>
        {remainingCharacters?.map((character) => (
          <CharacterDefaultBtn
            type="button"
            onClick={onSelectCharacterClick(character.id)}
            key={character.id}
          >
            {getName(character)}
          </CharacterDefaultBtn>
        ))}
      </div>
    </ModalContainer>
  );
}
