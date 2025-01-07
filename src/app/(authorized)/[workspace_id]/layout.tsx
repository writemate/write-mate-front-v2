"use client";
import {
  WorkspaceContainer,
  HeaderAndMainContainer,
  SideBarAndMainContainer,
  MainContainer,
} from "@/styles/workspace";
import Header from "@/components/workspace/Header";
import SideTab from "@/components/workspace/SideTab";
import Sidebar from "@/components/workspace/Sidebar/Sidebar";
import IdeaBox from "@/components/workspace/IdeaBox/IdeaBox";
import { useWorkspaceLayout } from "@/hooks/workspace/useWorkspaceLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPlotOpen, isScriptOpen, openIdeaBox, toggleIdeaBox, ...sidetab } =
    useWorkspaceLayout();

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
            {children}
          </MainContainer>
          {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
      <ReactQueryDevtools />
    </WorkspaceContainer>
  );
}
