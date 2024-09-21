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
import PlotSidebar from "@/components/workspace/plot/PlotSidebar";
import ScriptSidebar from "@/components/workspace/script/ScriptSidebar";
import CharacterSidebar from "@/components/workspace/character/CharacterSidebar";
import IdeaBox from "@/components/workspace/IdeaBox";
import { useSidebar } from "@/hooks/workspace/useSidebar";
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
  const sidebar = useSidebar();
  const { isPlotOpen, isScriptOpen, isCharacterOpen } = sidebar;
  const [openIdeaBox, setOpenIdeaBox] = useState(false);
  const toggleIdeaBox = () => setOpenIdeaBox(!openIdeaBox);

  const { workId } = useParams() as { workId: string };
  console.log(workId);
  const pathName = usePathname();

  // 대제목? 받아오기
  const {
    isLoading,
    error,
    data: work,
  } = useQuery({
    queryKey: [workspaceQueryKeys.work, workId],
    queryFn: () => getWork(workId),
    staleTime: 0,
  });

  const getCurrentTitle = (path: string) => {
    if (path.includes("/info")) return "작품 정보";
    if (path.includes("/plot"))
      return work === undefined ? "무제" : work?.work_name;
    // todo: 라우팅 나오면 추가
    return false;
  };

  console.log(work);

  return (
    <WorkspaceContainer>
      <SideTab {...sidebar} />
      <HeaderAndMainContainer>
        <Header toggleIdeaBox={toggleIdeaBox} />
        <SideBarAndMainContainer>
          {isPlotOpen && <PlotSidebar />}
          {isScriptOpen && <ScriptSidebar />}
          {isCharacterOpen && <CharacterSidebar />}
          <MainContainer>
            <TitleContainer>{getCurrentTitle(pathName)}</TitleContainer>
            {children}
          </MainContainer>
          {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
