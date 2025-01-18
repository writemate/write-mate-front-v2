import { colorSystem } from "@/styles/colorSystem";
import { media } from "@/styles/media";
import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  gap: 10px;
  z-index: 1;

  position: absolute;
  width: 564px;

  left: 10px;
  top: 100%;

  background: #ffffff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  ${media.tablet} {
    width: fit-content;
    padding: 15px;
  }
`;

export const SelectBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  ${media.tablet} {
    align-items: center;
  }
`;

export const AutoBtn = styled.button`
  display: flex;
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

  ${media.tablet} {
    height: 32px;
    margin: 4px 6px 6px 0;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 16px;
    align-items: center;
  }
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

  ${media.tablet} {
    height: 32px;
    margin: 4px 6px 6px 0;
    padding: 8px 12px;
    font-size: 14px;
    align-items: center;
  }
`;

export const CharacterCheckBtn = styled(CharacterDefaultBtn)`
  color: ${colorSystem.orange400};
  background-color: ${colorSystem.orange75};
  border-color: ${colorSystem.orange400};

  ${media.tablet} {
    height: 32px;
    font-size: 14px;
    align-items: center;
  }
`;
