import useClickAway from "@/hooks/workspace/plot/useClickAway";
import { colorSystem } from "@/styles/colorSystem";
import { TPlotEventCharacter } from "@/utils/APIs/types";
import { useState } from "react";
import styled from "styled-components";
import Circulation from "@/assets/workspace/characterModal/circulation.svg";
import Check from "@/assets/workspace/characterModal/check.svg";

interface CharacterModalProps {
  onClose: () => void;
  character: TPlotEventCharacter[];
}

export default function CharacterModal({
  onClose,
  character,
}: CharacterModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });
  const [characters, setCharacter] = useState(character);

  // 자동연동
  const handleAutoChatacter = () => {};

  // 전체 캐릭터 리스트 가져오기

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
        {characters.map((character) => (
          <CharacterCheckBtn
            onClick={handleDeleteCharacter}
            key={character._id}
          >
            <Check style={{ marginRight: "6px" }} />
            {character.ch_name}
          </CharacterCheckBtn>
        ))}
      </div>

      <div>
        {characters.map((character) => (
          <CharacterDefaultBtn onClick={handleAddCharacter} key={character._id}>
            {character.ch_name}
          </CharacterDefaultBtn>
        ))}
      </div>
    </ModalContainer>
  );
}

const AutoBtn = styled.button`
  display: inline-block;
  padding: 12px 20px 12px 16px;
  margin: 0 18px 20px 0;

  height: 44px;
  border: none;

  /* Orange/Orange 500 */
  background: ${colorSystem.orange400};
  color: white;
  border-radius: 100px;

  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;

const CharacterDefaultBtn = styled.button`
  box-sizing: border-box;
  margin: 0 8px 8px 0;
  cursor: pointer;

  display: inline-block;
  padding: 12px 20px;

  height: 44px;

  font-weight: 700;
  font-size: 16px;
  color: ${colorSystem.gray300};

  background: rgba(255, 255, 255, 0.002);
  border: 1px solid ${colorSystem.gray300};
  border-radius: 100px;
`;

const CharacterCheckBtn = styled(CharacterDefaultBtn)`
  color: ${colorSystem.orange400};
  border-color: ${colorSystem.orange400};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;

  position: absolute;
  width: 564px;

  left: calc(50% - 564px / 2 - 108px);
  top: calc(50% - 168px / 2 - 108px);

  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;
