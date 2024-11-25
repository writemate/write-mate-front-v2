"use client";
import { clickable, Button } from "@/styles";
import { styled } from "styled-components";
export const KebabContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0%;
  display: flex;
  width: 132px;
  padding: 6px 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0px 0px 8px 0px rgba(30, 33, 43, 0.2);

  z-index: 10000;
`;

export const KebabItem = styled(Button)<{
  $isActivated?: boolean;
  $isMajor?: boolean;
  $isLast?: boolean;
}>`
  ${clickable}
  display: flex;
  width: 113px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 4px;
  border-bottom: 1px solid
    ${({ theme, $isLast }) => ($isLast ? "none" : theme.color.gray75)};

  color: ${({ theme, $isMajor }) =>
    $isMajor ? theme.color.red600 : theme.color.black};
  text-align: center;

  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 135%;

  &:hover {
    background: ${({ theme, $isMajor }) =>
      $isMajor ? theme.color.red200 : theme.color.gray75};
  }
`;
