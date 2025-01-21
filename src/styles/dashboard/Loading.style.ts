import styled from "styled-components";
import { FontRegular16 } from "../Font";
import { FlexColumnCenter } from "..";

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
  min-height: 60px;
`;

export const RelativContainer = styled.div`
  position: relative;
  ${FlexColumnCenter}
  width: 100%;
  height: 100%;
  min-height: 60px;
`;
