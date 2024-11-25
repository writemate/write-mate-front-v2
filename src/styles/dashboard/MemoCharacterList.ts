import styled from "styled-components";

export const AddMemoButton = styled.button<{ isEmpty?: boolean }>`
  position: fixed;
  left: calc(50% - 88.5px);
  bottom: ${({ isEmpty }) => (isEmpty ? "calc(50% - 120px)" : "50px")};

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
  letter-spacing: 0.32px;
  max-width: 177px;

  &:hover {
    transform: scale(1.05);
    filter: brightness(105%);
  }
`;
