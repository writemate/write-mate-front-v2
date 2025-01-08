"use client";
import {
  SideTabContainer,
  LogoLink,
  SideTabLink,
  SideTabButton,
} from "@/styles/workspace/SideTab.styles";
import Footer from "@/components/workspace/Footer";
import Logo from "@/assets/logo.svg";
import Info from "@/assets/workspace/sideTab/info.svg";
import Plot from "@/assets/workspace/sideTab/plot.svg";
import Script from "@/assets/workspace/sideTab/script.svg";
import Character from "@/assets/workspace/sideTab/character.svg";
import {
  useWorkspaceLayout,
  WorkspaceLayoutContext,
} from "@/hooks/workspace/useWorkspaceLayout";
import { useParams } from "next/navigation";
import { useContext } from "react";

export default function SideTab() {
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const {
    isInfoActive,
    isPlotActive,
    isScriptActive,
    isCharacterActive,
    togglePlot,
    toggleScript,
  } = useContext(WorkspaceLayoutContext);

  return (
    <SideTabContainer>
      <LogoLink href="/dashboard">
        <Logo />
      </LogoLink>
      <SideTabLink href={`/${workspace_id}/info`} $isActivated={isInfoActive}>
        <Info /> 작품 정보
      </SideTabLink>
      <SideTabButton onClick={togglePlot} $isActivated={isPlotActive}>
        <Plot /> 플롯
      </SideTabButton>
      <SideTabButton onClick={toggleScript} $isActivated={isScriptActive}>
        <Script /> 원고
      </SideTabButton>
      <SideTabLink
        href={`/${workspace_id}/character`}
        $isActivated={isCharacterActive}
      >
        <Character /> 인물
      </SideTabLink>
      <Footer />
    </SideTabContainer>
  );
}
