"use client";
import { colorSystem } from "@/styles/colorSystem";
import { media } from "@/styles/media";
import styled from "styled-components";

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 10px;
  margin-bottom: 24px;
  margin-top: 25px;

  ${media.tablet} {
    scale: 0.6;
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 30px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;

    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);

    box-shadow: 2px 1px 4px rgba(52, 55, 61, 0.35);
  }
`;

export const CheckBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: ${colorSystem.orange400};
  }

  &:focus + ${ToggleSlider} {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(26px) translateY(-50%);
  }
`;
