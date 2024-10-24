import { colorSystem } from "@/styles/colorSystem";
import styled from "styled-components";

export const AutoBtn = styled.button`
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

export const CharacterDefaultBtn = styled.button`
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

export const CharacterCheckBtn = styled(CharacterDefaultBtn)`
  color: ${colorSystem.orange400};
  border-color: ${colorSystem.orange400};
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;
  z-index: 1;

  position: absolute;
  width: 564px;

  left: 40px;
  top: 90px;

  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;
