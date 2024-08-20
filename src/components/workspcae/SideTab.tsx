'use client';
import { SideTabContainer, LogoLink, SideTabLink, SideTabButton } from "@/styles/workspace/SideTab.styles";
import Footer from '@/components/workspcae/Footer';
import Logo from '@/assets/logo.svg';
import Info from '@/assets/workspace/sideTab/info.svg';
import Plot from '@/assets/workspace/sideTab/plot.svg';
import Script from '@/assets/workspace/sideTab/script.svg';
import Character from '@/assets/workspace/sideTab/character.svg';
import { usePathname  } from 'next/navigation';

export default function SideTab() {
  const pathname = usePathname();

  return (
      <SideTabContainer>
        <LogoLink href="/dashboard">
            <Logo />
        </LogoLink>
        <SideTabLink $active={pathname.endsWith('/info')} href="./info">
          <Info />
        </SideTabLink>
        <SideTabButton $active={pathname.endsWith('/plot')} >
          <Plot />
        </SideTabButton>
        <SideTabButton $active={pathname.endsWith('/script')} >
          <Script />
        </SideTabButton>
        <SideTabButton $active={pathname.endsWith('/character')} >
          <Character />
        </SideTabButton>
        <Footer />
      </SideTabContainer>
  );
}
