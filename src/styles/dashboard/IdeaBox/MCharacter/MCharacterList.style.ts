import { FlexColumnLeftStart } from "@/styles";
import { Round9999OrangeBackgoundWhiteColor } from "@/styles/Button";
import styled from "styled-components";

export const AddMemoButton = styled.button<{ $isEmpty?: boolean }>`
  ${Round9999OrangeBackgoundWhiteColor}
  position: fixed;
  left: calc(50% - 88.5px);
  bottom: ${({ $isEmpty = false }) =>
    $isEmpty ? "calc(50% - 120px)" : "50px"};
  width: 160px;
`;

export const CharacterCard = styled.div<{ $isSelected?: boolean }>`
  ${FlexColumnLeftStart};
  height: 160px;
  width: 100%;
  visibility: ${({ $isSelected }) => ($isSelected ? "hidden" : "visible")};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);
  border: none !important;

  margin-bottom: 6px;
  padding: 13px;
  gap: 8px;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;
