import { FlexColumnLeftStart } from "@/styles";
import styled from "styled-components";

export const AddMemoButton = styled.button<{ $isEmpty?: boolean }>`
  position: fixed;
  left: calc(50% - 88.5px);
  bottom: ${({ $isEmpty = false }) =>
    $isEmpty ? "calc(50% - 120px)" : "50px"};

  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.gray300};
  border: none;

  color: ${({ theme }) => theme.color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%;
  max-width: 177px;
  letter-spacing: 0.32px;

  &:hover {
    filter: brightness(95%);
  }
`;

export const CharacterListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  align-items: start;
  justify-content: start;
  gap: 16px;
  padding: 16px;
  padding-bottom: 100px;
  width: 100%;
  overflow-y: auto;
`;

export const CharacterCard = styled.div<{ $isSelected?: boolean }>`
  ${FlexColumnLeftStart};
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 2px 2px 12px 0px rgba(18, 18, 18, 0.12);
  margin-bottom: 6px;
  padding: 20px;
  visibility: ${({ $isSelected }) => ($isSelected ? "hidden" : "visible")};
  border: none !important;
  gap: 8px;

  &:hover {
    outline: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;
