import { colorSystem } from "@/styles/colorSystem";
import styled from "styled-components";

export const ChapterContainer = styled.form<{ isOpenAlone: boolean }>`
  width: 100%;
  position: relative;
  background: #ffffff;
  border: 1px solid #f49661;
  margin-bottom: 18.18px;

  flex-wrap: wrap;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

export const ChapterDragWrap = styled.div`
  float: left;
  padding-left: 17px;
  position: absolute;
  top: 45%;
`;

export const ChapterMargin = styled.div`
  margin: 16px 20px 0 40px;
`;

export const OpenContainer = styled.div`
  display: grid;
  justify-items: center;
  margin: 20px 0px;
`;

export const IconButton = styled.button`
  width: 32px;
  font-size: 18px;
  background: transparent;
  border: none;
  color: ${colorSystem.gray300};
  cursor: pointer;
`;

export const AddButton = styled.button`
  cursor: pointer;
  padding: 4.46538px;
  width: 23.82px;
  height: 23.82px;
  border: none;
  margin-top: 8px;

  background: ${colorSystem.orange400};
  box-shadow: 0px 0.992308px 2.97692px rgba(0, 0, 0, 0.1),
    0px 0.992308px 1.98462px -0.992308px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

export const TitleInput = styled.input`
  height: 36px;
  text-overflow: clip;
  width: 89%;
  border: none;

  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  display: inline-block;

  margin-bottom: 8px;

  color: ${colorSystem.gray900};
`;

export const ContentTextArea = styled.textarea<{
  isEvent: boolean;
  isFolded: boolean;
}>`
  border: none;
  height: 24px;
  resize: none;
  width: 95%;
  margin-bottom: ${(props) => props.isFolded && !props.isEvent && "24px"};
  background: ${(props) => (props.isEvent ? `${colorSystem.gray25}` : "white")};

  font-weight: 600;
  font-size: 16px;
  line-height: 150%;

  display: flex;
  align-items: center;

  color: ${colorSystem.gray900};
`;
