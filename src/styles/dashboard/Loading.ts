import styled from "styled-components";

export const LoadingMessage = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  height: fit-content;

  justify-content: center;
  align-items: center;
  text-align: center;

  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray300};
`;
