import styled from "styled-components";

export const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.gray300};
`;
