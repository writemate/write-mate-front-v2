import styled from "styled-components";
import { FontRegular16 } from "../Font";

export const LoadingMessage = styled.div`
  ${FontRegular16}
  position: absolute;
  top: 50%;
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.gray400};
  white-space: pre-line;
`;
