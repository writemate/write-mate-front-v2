'use client';
import { SideTabContainer, LogoLink, SideTabLink, SideTabButton } from "@/styles/workspace/SideTab.styles";
import Footer from '@/components/workspcae/Footer';
import Logo from '@/assets/logo.svg';
import Info from '@/assets/workspace/sideTab/info.svg';
import Plot from '@/assets/workspace/sideTab/plot.svg';
import Script from '@/assets/workspace/sideTab/script.svg';
import Character from '@/assets/workspace/sideTab/character.svg';
import { usePathname  } from 'next/navigation';
import { useSidebar } from "@/hooks/workspace/useSidebar";

export default function SideTab({ togglePlot, toggleScript, toggleCharacter, isPlotOpen, isScriptOpen, isCharacterOpen }: ReturnType<typeof useSidebar>) {
  const pathname = usePathname();

  const sideTab = [
    { name: 'plot', icon: Plot, onClick: togglePlot, open: isPlotOpen },
    { name: 'script', icon: Script, onClick: toggleScript, open: isScriptOpen },
    { name: 'character', icon: Character, onClick: toggleCharacter, open: isCharacterOpen },
  ]

  return (
      <SideTabContainer>
        <LogoLink href="/dashboard">
            <Logo />
        </LogoLink>
        <SideTabLink $inPage={pathname.endsWith('/info')} href="./info">
          <Info />
        </SideTabLink>
        {
          sideTab.map((tab, index) => (
            <SideTabButton key={index} $inPage={pathname.endsWith(`/${tab.name}`)} $isOpened={tab.open} onClick={tab.onClick}>
              <tab.icon />
            </SideTabButton>
          ))
        }
        <Footer />
      </SideTabContainer>
  );
}
