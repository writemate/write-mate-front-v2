"use client";
import { media } from "@/styles/media";
import { styled } from "styled-components";
import { Button, FlexColumnCenter } from "@/styles";
import Danger from "@/assets/icons/danger.svg";
import { FontSemibold16 } from "./Font";

export const ModalContainer = styled.div`
  position: relative;
  ${FlexColumnCenter}
  ${FontSemibold16}
  padding: calc(12px + 53px - 44px) 12px 12px 12px;

  border-radius: 12px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  align-items: center;

  p {
    color: ${({ theme }) => theme.color.black};
    text-align: center;
    white-space: pre-line;
  }

  svg {
    width: 32px;
    height: 32px;
    margin-bottom: 12px;
  }

  ${media.mobile} {
    scale: 0.9;
    p {
      font-size: 14px;
      word-break: keep-all;
    }
  }
`;

export const DangerIcon = styled(Danger)`
  margin-top: 10px;
  margin-bottom: 5px;
  width: 44px !important;
  height: 44px !important;
`;

export const ButtonContainer = styled.div`
  padding-top: 16px;
  display: flex;
  gap: 8px;
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

  ${media.mobile} {
    padding: 6px 12px;
    font-size: 14px;
  }
`;
