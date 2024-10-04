"use client";
import {
  CheckBox,
  ToggleSlider,
  ToggleSwitch,
} from "@/styles/workspace/plot/ToggleBtn.styles";
import { useState } from "react";

interface ToggleBtnProps {
  isOpen: boolean;
  handleChange: () => void;
}

export default function ToggleBtn({ isOpen, handleChange }: ToggleBtnProps) {
  return (
    <div style={{ marginLeft: "auto" }}>
      <ToggleSwitch>
        <CheckBox type="checkbox" checked={isOpen} onChange={handleChange} />
        <ToggleSlider />
      </ToggleSwitch>
    </div>
  );
}
