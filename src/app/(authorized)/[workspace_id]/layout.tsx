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
import {
  useWorkspaceLayout,
  WorkspaceLayoutContext,
} from "@/hooks/workspace/useWorkspaceLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Error from "@/app/error";
import { Loading } from "@/components/Loading";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const workspaceLayoutValue = useWorkspaceLayout();
  const {
    isPlotOpen,
    isScriptOpen,
    openIdeaBox,
    toggleIdeaBox,
    isScriptPage,
    data,
    error,
    isLoading,
  } = workspaceLayoutValue;

  return (
    <>
      {error && <Error />}
      {isLoading && <Loading />}
      {data && (
        <WorkspaceContainer>
          <WorkspaceLayoutContext.Provider value={workspaceLayoutValue}>
            <SideTab />
            <HeaderAndMainContainer>
              <Header toggleIdeaBox={toggleIdeaBox} />
              <SideBarAndMainContainer>
                {isPlotOpen && <Sidebar type="plot" />}
                {isScriptOpen && <Sidebar type="script" />}
                <MainContainer
                  $isLeftOpen={isPlotOpen || isScriptOpen}
                  $isRightOpen={openIdeaBox}
                  $isScriptPage={isScriptPage}
                >
                  {children}
                </MainContainer>
                {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
              </SideBarAndMainContainer>
            </HeaderAndMainContainer>
            <ReactQueryDevtools />
          </WorkspaceLayoutContext.Provider>
        </WorkspaceContainer>
      )}
    </>

  );
}
