import { colorSystem } from "@/styles/colorSystem";
import styled from "styled-components";
import { IconButton } from "./Chapter.styles";

export const EventDeleteBtn = styled(IconButton)`
  font-size: 14.88px;
  float: right;
  margin-right: 20px;
`;

export const CharacterModalBtn = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const EventColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EventContainer = styled.div`
  box-sizing: border-box;
  padding: 20px 0 20px 31px;

  width: 100%;
  margin-bottom: 12px;

  background: ${colorSystem.gray25};
  border: 1px solid #d7ddea;
  border-radius: 8px;
`;

export const EventTitle = styled.input`
  height: 30px;
  width: 95%;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  align-items: center;
  border: none;

  color: rgba(0, 0, 0, 0.87);

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  background: transparent;
  margin-bottom: 5px;
  margin-top: 16px;
`;

export const EventDescription = styled.textarea`
  height: 24px;
  width: 95%;
  background: transparent;
  resize: none;

  border: none;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;

  color: ${colorSystem.gray900};

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;
