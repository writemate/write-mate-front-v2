import useClickAway from "@/hooks/workspace/plot/useClickAway";
import { colorSystem } from "@/styles/colorSystem";
import { TPlotEventCharacter } from "@/utils/APIs/types";
import { useState } from "react";
import styled from "styled-components";
import Circulation from "@/assets/workspace/characterModal/circulation.svg";

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
  const handleGetChatacter = () => {};

  //토스트알림

  //캐릭터 선택

  return (
    <ModalContainer ref={ref}>
      <AutoBtn onClick={handleGetChatacter}>
        <Circulation />
        자동 연동
      </AutoBtn>
      <div>
        {characters.map((character) => (
          <CharacterDefaultBtn key={character._id}>
            {character.ch_name}
          </CharacterDefaultBtn>
        ))}
      </div>
    </ModalContainer>
  );
}

const AutoBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px 12px 16px;
  gap: 10px;

  height: 44px;
  border: none;

  /* Orange/Orange 500 */
  background: ${colorSystem.orange400};
  color: white;
  border-radius: 100px;

  font-weight: 700;
  font-size: 16px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CharacterDefaultBtn = styled.button`
  box-sizing: border-box;
  margin: 0 8px 8px 0;

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
//calc(50% - 168px / 2 - 108px);
