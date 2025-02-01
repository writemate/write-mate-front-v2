"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useQueries, useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getInfo,
  getPlotFolderList,
  getScriptFolderList,
} from "@/utils/APIs/workspace";
import {
  getCharacterList,
  getKeywordList,
} from "@/utils/APIs/workspace/character";

enum SidebarType {
  plot,
  script,
}

export const useWorkspaceLayout = () => {
  const [sidebarType, setSidebarType] = useState<SidebarType | null>(
    SidebarType.script
  );
  const [openIdeaBox, setOpenIdeaBox] = useState(true);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (sidebarType === null) return;
    const handleClick = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarType]);

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
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const [
    { data: info, error: infoError, isLoading: infoLoading },
    { data: plotFolders, error: plotError, isLoading: plotLoading },
    { data: scriptFolders, error: scriptError, isLoading: scriptLoading },
    {
      data: characterList,
      error: characterError,
      isLoading: isCharactersLoading,
    },
    { data: keywordList, error: keywordError, isLoading: isKeywordsLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: workspaceQueryKeys.info(workspace_id),
        queryFn: getInfo(workspace_id),
      },
      {
        queryKey: workspaceQueryKeys.plotSidebar(workspace_id),
        queryFn: getPlotFolderList(workspace_id),
      },
      {
        queryKey: workspaceQueryKeys.scriptSidebar(workspace_id),
        queryFn: getScriptFolderList(workspace_id),
      },
      {
        queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
        queryFn: getKeywordList(workspace_id),
      },
      {
        queryKey: workspaceQueryKeys.characterList(workspace_id),
        queryFn: getCharacterList(workspace_id),
      },
    ],
  });

  // 전체 로딩 상태 체크
  const isLoading =
    infoLoading ||
    plotLoading ||
    scriptLoading ||
    isCharactersLoading ||
    isKeywordsLoading;

  // 에러 체크
  const hasError =
    infoError || plotError || scriptError || characterError || keywordError;

  return {
    hasError,
    isLoading,
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
    sidebarRef,
  };
};

export const WorkspaceLayoutContext = createContext(
  {} as ReturnType<typeof useWorkspaceLayout>
);
