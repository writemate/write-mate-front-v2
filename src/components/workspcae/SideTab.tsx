'use client';
import { SideTabContainer, LogoLink, SideTabLink, SideTabButton } from "@/styles/workspace/SideTab.styles";
import Footer from '@/components/workspcae/Footer';
import Logo from '@/assets/logo.svg';
import Info from '@/assets/workspace/sideTab/info.svg';
import Plot from '@/assets/workspace/sideTab/plot.svg';
import Script from '@/assets/workspace/sideTab/script.svg';
import Character from '@/assets/workspace/sideTab/character.svg';
import { usePathname  } from 'next/navigation';

export default function SideTab({ togglePlot, toggleScript, toggleCharacter }: { togglePlot: () => void, toggleScript: () => void, toggleCharacter: () => void }) {
  const pathname = usePathname();

  return (
      <SideTabContainer>
        <LogoLink href="/dashboard">
            <Logo />
        </LogoLink>
        <SideTabLink $active={pathname.endsWith('/info')} href="./info">
          <Info />
        </SideTabLink>
        <SideTabButton $active={pathname.endsWith('/plot')} onClick={togglePlot}>
          <Plot />
        </SideTabButton>
        <SideTabButton $active={pathname.endsWith('/script')} onClick={toggleScript}>
          <Script />
        </SideTabButton>
        <SideTabButton $active={pathname.endsWith('/character')} onClick={toggleCharacter}>
          <Character />
        </SideTabButton>
        <Footer />
      </SideTabContainer>
  );
}
