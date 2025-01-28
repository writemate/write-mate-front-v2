"use client";
import { styled } from "styled-components";
import { clickable, FlexRowSpaceBetween } from "@/styles";
import { GtagForClick } from "@/utils/GtagForClick";
import { FontSemibold14, FontSemibold16 } from "../Font";
import { media } from "../media";

export const HeaderContainer = styled.header`
  ${FlexRowSpaceBetween}
  position: fixed;
  z-index: 99;
  background-color: rgb(255, 255, 255, 0.95);
  padding: 20px max(calc(50% - 600px), 20px);
  width: 98.5%;
  display: flex;
  align-items: center;
  user-select: none;
  height: 80px;
`;

export const RightMenuButton = styled.button`
  ${clickable};
  ${FontSemibold16}
  padding: 10px;
  text-align: center;
  margin-left: auto;
  transition: font-weight 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  background: none;
  border: none;
  &:hover {
    font-weight: 700;
  }

  ${media.tablet} {
    display: none;
  }
`;

export const StartButton = styled(GtagForClick)`
  ${clickable};
  ${FontSemibold16};
  padding: 10px;
  text-align: center;
  margin-left: 20px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 5px;
  background-color: #191919;
  color: white;
  border: none;
  &:hover {
    background-color: #333;
  }
`;
