import styled from "styled-components";
import { clickable } from "@/styles";

export const AddWorkspaceButton = styled.button`
  ${clickable}
  padding: 12px 28px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.color.orange400};
  border: none;

  color: ${({ theme }) => theme.color.white};
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;

  &:hover {
    filter: brightness(95%);
  }
`;
