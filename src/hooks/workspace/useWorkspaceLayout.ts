"use client";
import { createContext, useState } from "react";
import { usePathname } from "next/navigation";

enum SidebarType {
  plot,
  script,
}

export const useWorkspaceLayout = () => {
  const [sidebarType, setSidebarType] = useState<SidebarType | null>(null);
  const [openIdeaBox, setOpenIdeaBox] = useState(false);
  const pathname = usePathname();
  const toggleIdeaBox = () => setOpenIdeaBox(!openIdeaBox);

  const toggle = (type: SidebarType) => () => {
    if (sidebarType === type) return setSidebarType(null);
    setSidebarType(type);
  };

  const togglePlot = toggle(SidebarType.plot);
  const toggleScript = toggle(SidebarType.script);

  const isPlotOpen = sidebarType === SidebarType.plot;
  const isScriptOpen = sidebarType === SidebarType.script;

  const closeSidebar = () => setSidebarType(null);

  const pageOn = (page: string) => pathname.includes("/" + page);

  // 사이드바가 열려있다면, 해당 항목 아이콘 활성화
  // 사이드바가 닫혀있다면, 현재 페이지에 해당하는 아이콘 활성화
  const getActive = (page: string, active: boolean) => {
    if (sidebarType === null) return pageOn(page);
    return active;
  };

  const isInfoActive = getActive("info", false);
  const isPlotActive = getActive("plot", isPlotOpen);
  const isScriptActive = getActive("script", isScriptOpen);
  const isCharacterActive = getActive("character", false);
  const isScriptPage = pageOn("script");

  return {
    togglePlot,
    toggleScript,
    isPlotOpen,
    isScriptOpen,
    openIdeaBox,
    toggleIdeaBox,
    isInfoActive,
    isPlotActive,
    isScriptActive,
    isCharacterActive,
    isScriptPage,
    closeSidebar,
  };
};

export const WorkspaceLayoutContext = createContext(
  {} as ReturnType<typeof useWorkspaceLayout>
);
