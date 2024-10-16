"use client";
import {
  WorkspaceContainer,
  HeaderAndMainContainer,
  SideBarAndMainContainer,
  MainContainer,
  TitleContainer,
} from "@/styles/workspace";
import Header from "@/components/workspace/Header";
import SideTab from "@/components/workspace/SideTab";
import Sidebar from "@/components/workspace/Sidebar/Sidebar";
import IdeaBox from "@/components/workspace/IdeaBox";
import { useWorkspaceLayout } from "@/hooks/workspace/useWorkspaceLayout";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getWork } from "@/utils/APIs/workspace";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPlotOpen, isScriptOpen, openIdeaBox, toggleIdeaBox, ...sidetab } =
    useWorkspaceLayout();

  const { workspace_id } = useParams() as { workspace_id: string };
  const pathName = usePathname();

  // 대제목? 받아오기
  const {
    isLoading,
    error,
    data: work,
  } = useQuery({
    queryKey: workspaceQueryKeys.workName(workspace_id),
    queryFn: getWork(workspace_id),
    staleTime: 0,
  });

  const getCurrentTitle = (path: string) => {
    if (path.includes("/info")) return "작품 정보";
    if (path.includes("/plot")) return work?.work_name;
    // todo: 라우팅 나오면 추가
    return false;
  };

  const currentTitle = getCurrentTitle(pathName);

  return (
    <WorkspaceContainer>
      <SideTab {...sidetab} />
      <HeaderAndMainContainer>
        <Header toggleIdeaBox={toggleIdeaBox} />
        <SideBarAndMainContainer>
          {isPlotOpen && <Sidebar type="plot" />}
          {isScriptOpen && <Sidebar type="script" />}
          <MainContainer
            $isLeftOpen={isPlotOpen || isScriptOpen}
            $isRightOpen={openIdeaBox}
          >
            {currentTitle && <TitleContainer>{currentTitle}</TitleContainer>}
            {children}
          </MainContainer>
          {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
