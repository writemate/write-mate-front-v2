import styled from "styled-components";
import { FontRegular13, FontRegular16, FontTabletRegular13 } from "../Font";

export const LoadingMessage = styled.div`
  ${FontRegular16}
  position: absolute;
  top: calc(50% - 8px);
  width: 100%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.color.gray400};
  white-space: pre-line;
`;

export const RelativContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 60px;
`;
