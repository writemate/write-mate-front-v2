import useClickAway from "@/hooks/workspace/plot/useClickAway";
import styled from "styled-components";

interface CharacterModalProps {
  onClose: () => void;
}

export default function CharacterModal({ onClose }: CharacterModalProps) {
  const ref = useClickAway(() => {
    onClose();
  });

  return <ModalContainer ref={ref}>hi</ModalContainer>;
}

const ModalContainer = styled.div`
  /* popup */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;

  position: absolute;
  width: 564px;
  height: 168px;
  left: calc(50% - 564px / 2 - 108px);
  top: calc(50% - 168px / 2 - 21px);

  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;
