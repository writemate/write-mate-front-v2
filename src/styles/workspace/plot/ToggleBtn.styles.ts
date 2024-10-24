"use client";
import { colorSystem } from "@/styles/colorSystem";
import styled from "styled-components";

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 10px;
  margin-bottom: 24px;
  margin-top: 25px;
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
    left: 0%;
    right: 59.18%;
    top: 0%;
    bottom: 1px;

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
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;
