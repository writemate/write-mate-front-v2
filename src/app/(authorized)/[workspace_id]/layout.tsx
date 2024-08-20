'use client';
import { WorkspaceContainer, HeaderAndMainContainer, SideBarAndMainContainer, MainContainer } from '@/styles/workspace';
import Header from '@/components/workspcae/Header';
import SideTab from '@/components/workspcae/SideTab';
import PlotSidebar from '@/components/workspcae/plot/PlotSidebar';
import ScriptSidebar from '@/components/workspcae/script/ScriptSidebar';
import CharacterSidebar from '@/components/workspcae/character/CharacterSidebar';
import IdeaBox from '@/components/workspcae/IdeaBox';
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
