"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
  MainContainer,
  SideTabContainer,
  LogoLink,
  SideTabLink,
  SideTabMenu,
} from "@/styles/dashboard/index";
import Logo from "@/assets/dashboard/sideTab/logo.svg";
import ActiveArtStudio from "@/assets/dashboard/sideTab/active/artStudio.svg";
import ActiveIdeaLocker from "@/assets/dashboard/sideTab/active/ideaLocker.svg";
import ActiveRecycleBin from "@/assets/dashboard/sideTab/active/recycleBin.svg";
import InactiveArtStudio from "@/assets/dashboard/sideTab/inactive/artStudio.svg";
import InactiveIdeaLocker from "@/assets/dashboard/sideTab/inactive/ideaLocker.svg";
import InactiveRecycleBin from "@/assets/dashboard/sideTab/inactive/recycleBin.svg";
import { useState } from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isArtStudioActive, setArtStudioActive] = useState(false);
  const [isIdeaLockerActive, setIdeaLockerActive] = useState(false);
  const [isRecycleBinActive, setRecycleBinActive] = useState(false);

  const toggleArtStudio = () => setArtStudioActive((prev) => !prev);
  const toggleIdeaLocker = () => setIdeaLockerActive((prev) => !prev);
  const toggleRecycleBin = () => setRecycleBinActive((prev) => !prev);

  return (
    <DashboardContainer>
      <SideTabContainer>
        <LogoLink href="/dashboard">
          <Logo />
        </LogoLink>
        <SideTabMenu>
          <SideTabLink
            onClick={toggleArtStudio}
            href="/dashboard/artStudio"
            $isActivated={isArtStudioActive}
          >
            {isArtStudioActive ? <ActiveArtStudio /> : <InactiveArtStudio />}
            작품 스튜디오
          </SideTabLink>
          <SideTabLink
            onClick={toggleIdeaLocker}
            href="/dashboard/ideaLocker"
            $isActivated={isIdeaLockerActive}
          >
            {isIdeaLockerActive ? <ActiveIdeaLocker /> : <InactiveIdeaLocker />}
            아이디어 보관함
          </SideTabLink>
          <SideTabLink
            onClick={toggleRecycleBin}
            href="/dashboard/recycleBin"
            $isActivated={isRecycleBinActive}
          >
            {isRecycleBinActive ? <ActiveRecycleBin /> : <InactiveRecycleBin />}
            휴지통
          </SideTabLink>
        </SideTabMenu>
      </SideTabContainer>
      <HeaderAndMainContainer>
        <MainContainer>{children}</MainContainer>
      </HeaderAndMainContainer>
    </DashboardContainer>
  );
}
