'use client';
import { SideTabContainer, LogoLink, SideTabLink, SideTabButton } from "@/styles/workspace/SideTab.styles";
import Footer from '@/components/workspace/Footer';
import Logo from '@/assets/logo.svg';
import Info from '@/assets/workspace/sideTab/info.svg';
import Plot from '@/assets/workspace/sideTab/plot.svg';
import Script from '@/assets/workspace/sideTab/script.svg';
import Character from '@/assets/workspace/sideTab/character.svg';
import { useWorkspaceLayout } from "@/hooks/workspace/useWorkspaceLayout";
import { useParams  } from 'next/navigation';

export default function SideTab({ togglePlot, toggleScript, isInfoActive, isPlotActive, isScriptActive, isCharacterActive }: Omit<ReturnType<typeof useWorkspaceLayout>, "isPlotOpen"|"isScriptOpen"|"openIdeaBox" | "toggleIdeaBox">) {
  const { workspace_id } = useParams<{ workspace_id: string }>();

  return (
      <SideTabContainer>
        <LogoLink href="/dashboard">
            <Logo />
        </LogoLink>
        <SideTabLink href={`/${workspace_id}/info`} $isActivated={isInfoActive}>
          <Info />
        </SideTabLink>
        <SideTabButton onClick={togglePlot} $isActivated={isPlotActive}>
          <Plot />
        </SideTabButton>
        <SideTabButton onClick={toggleScript} $isActivated={isScriptActive}>
          <Script />
        </SideTabButton>
        <SideTabLink href={`/${workspace_id}/character`} $isActivated={isCharacterActive}>
          <Character />
        </SideTabLink>
        <Footer />
      </SideTabContainer>
  );
}
