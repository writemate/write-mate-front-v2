'use client';
import { useState } from 'react';

enum SidebarType {
  plot,
  script,
  character,
}

export const useSidebar = () => {
  const [sidebarType, setSidebarType] = useState<SidebarType| null>(null);

  const toggle = (type: SidebarType) => () =>{
    if (sidebarType === type) {
      setSidebarType(null);
    } else {
      setSidebarType(type);
    }
  };

  const togglePlot = toggle(SidebarType.plot);
  const toggleScript = toggle(SidebarType.script);
  const toggleCharacter = toggle(SidebarType.character);

  const isPlotOpen = sidebarType === SidebarType.plot;
  const isScriptOpen = sidebarType === SidebarType.script;
  const isCharacterOpen = sidebarType === SidebarType.character;

  return { togglePlot, toggleScript, toggleCharacter, isPlotOpen, isScriptOpen, isCharacterOpen };
};
