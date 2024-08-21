'use client';
import { WorkspaceContainer, HeaderAndMainContainer, SideBarAndMainContainer, MainContainer } from '@/styles/workspace';
import Header from '@/components/workspace/Header';
import SideTab from '@/components/workspace/SideTab';
import PlotSidebar from '@/components/workspace/plot/PlotSidebar';
import ScriptSidebar from '@/components/workspace/script/ScriptSidebar';
import CharacterSidebar from '@/components/workspace/character/CharacterSidebar';
import IdeaBox from '@/components/workspace/IdeaBox';
import { useSidebar } from '@/hooks/workspace/useSidebar';
import { useState } from 'react';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const sidebar = useSidebar();
  const { isPlotOpen, isScriptOpen, isCharacterOpen } = sidebar;
  const [openIdeaBox, setOpenIdeaBox] = useState(false);
  const toggleIdeaBox = () => setOpenIdeaBox(!openIdeaBox);

  return (
    <WorkspaceContainer>
      <SideTab {...sidebar} />
      <HeaderAndMainContainer>
        <Header toggleIdeaBox={toggleIdeaBox}/>
        <SideBarAndMainContainer>
          {isPlotOpen && <PlotSidebar />}
          {isScriptOpen && <ScriptSidebar />}
          {isCharacterOpen && <CharacterSidebar />}
          <MainContainer>
            {children}
          </MainContainer>
          {openIdeaBox && <IdeaBox toggleIdeaBox={toggleIdeaBox} />}
        </SideBarAndMainContainer>
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
