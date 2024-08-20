'use client';
import { WorkspaceContainer, HeaderAndMainContainer, SideBarAndMainContainer, MainContainer } from '@/styles/workspace';
import Header from '@/components/workspcae/Header';
import SideTab from '@/components/workspcae/SideTab';
import PlotSidebar from '@/components/workspcae/plot/PlotSidebar';
import ScriptSidebar from '@/components/workspcae/script/ScriptSidebar';
import CharacterSidebar from '@/components/workspcae/character/CharacterSidebar';
import { useSidebar } from '@/hooks/workspace/useSidebar';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebar();
  const { isPlotOpen, isScriptOpen, isCharacterOpen } = sidebar;

  return (
    <WorkspaceContainer>
      <SideTab {...sidebar} />
      <HeaderAndMainContainer>
        <Header />
        <SideBarAndMainContainer>
          {isPlotOpen && <PlotSidebar />}
          {isScriptOpen && <ScriptSidebar />}
          {isCharacterOpen && <CharacterSidebar />}
          <MainContainer>
            {children}
          </MainContainer>
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
