import { WorkspaceContainer, HeaderAndMainContainer } from '@/styles/workspace';
import Header from '@/components/workspcae/Header';
import SideTab from '@/components/workspcae/SideTab';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {

  return (
    <WorkspaceContainer>
      <SideTab />
      <HeaderAndMainContainer>
        <Header />
        {children}
      </HeaderAndMainContainer>
    </WorkspaceContainer>
  );
}
