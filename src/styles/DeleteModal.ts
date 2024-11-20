"use client";
import { styled } from "styled-components";
import { Button, FlexColumnCenter } from "@/styles";
import Danger from "@/assets/icons/danger.svg";

export const ModalContainer = styled.div`
  ${FlexColumnCenter}
  padding: 31px 41px;

  border-radius: 12px;
  background: var(--white, #fff);
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  align-items: center;
  gap: 26px;

  p {
    color: #121212;
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 160%;
  }
`;

export const DangerIcon = styled(Danger)`
  margin-top: 51px;
  flex-shrink: 0;
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
