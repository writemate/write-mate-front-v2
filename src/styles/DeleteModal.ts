"use client";
import { styled } from "styled-components";
import { Button, FlexColumnCenter } from "@/styles";
import Danger from "@/assets/icons/danger.svg";

export const ModalContainer = styled.div`
  ${FlexColumnCenter}
  padding: 16px;

  border-radius: 12px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  align-items: center;
  gap: 8px;

  p {
    color: ${({ theme }) => theme.color.black};
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 160%;
  }
`;

export const DangerIcon = styled(Danger)`
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  width: 100%;
`;

export const ModalButton = styled(Button)<{ $isDanger?: boolean }>`
  display: inline-flex;
  padding: 8px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: ${({ theme, $isDanger }) =>
    $isDanger ? theme.color.white : theme.color.black};
  border-radius: 100px;
  border: 1px solid
    ${({ theme, $isDanger }) =>
      $isDanger ? theme.color.dangerRed : theme.color.black};
  background: ${({ theme, $isDanger }) =>
    $isDanger ? theme.color.dangerRed : theme.color.white};

  &:hover {
    transform: scale(1.05); /* 살짝 확대 효과 */
    filter: brightness(105%);
  }
`;
