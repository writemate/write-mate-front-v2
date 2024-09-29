'use client';
import { WorkspaceContainer, HeaderAndMainContainer, SideBarAndMainContainer, MainContainer } from '@/styles/workspace';
import Header from '@/components/workspace/Header';
import SideTab from '@/components/workspace/SideTab';
import PlotSidebar from '@/components/workspace/plot/PlotSidebar';
import ScriptSidebar from '@/components/workspace/script/ScriptSidebar';
import CharacterSidebar from '@/components/workspace/character/CharacterSidebar';
import IdeaBox from '@/components/workspace/IdeaBox';
import { useWorkspaceLayout } from '@/hooks/workspace/useWorkspaceLayout';
import { useState } from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const { isPlotOpen, isScriptOpen, openIdeaBox, toggleIdeaBox, ...sidetab } = useWorkspaceLayout();

  return (
    <WorkspaceContainer>
      <SideTab {...sidetab} />
      <HeaderAndMainContainer>
        <Header toggleIdeaBox={toggleIdeaBox}/>
        <SideBarAndMainContainer>
          {isPlotOpen && <PlotSidebar />}
          {isScriptOpen && <ScriptSidebar />}
          <MainContainer>
            {children}
          </MainContainer>
          {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
