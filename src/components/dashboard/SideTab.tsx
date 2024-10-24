"use client";
import {
  SideTabContainer,
  LogoLink,
  SideTabLink,
  SideTabMenu,
  AddWorkspaceButton,
} from "@/styles/dashboard/SideTab";
import Logo from "@/assets/dashboard/sideTab/logo.svg";
import ActiveArtStudio from "@/assets/dashboard/sideTab/active/artStudio.svg";
import ActiveIdeaLocker from "@/assets/dashboard/sideTab/active/ideaLocker.svg";
import ActiveRecycleBin from "@/assets/dashboard/sideTab/active/recycleBin.svg";
import InactiveArtStudio from "@/assets/dashboard/sideTab/inactive/artStudio.svg";
import InactiveIdeaLocker from "@/assets/dashboard/sideTab/inactive/ideaLocker.svg";
import InactiveRecycleBin from "@/assets/dashboard/sideTab/inactive/recycleBin.svg";
import { useState } from "react";
import useDashboardData from "@/hooks/dashboard/useDashboardData";

export default function SideTab({
  isArtStudioActive,
  setIsArtStudioActive,
  isIdeaLockerActive,
  setIsIdeaLockerActive,
  isRecycleBinActive,
  setIsRecycleBinActive,
}: {
  isArtStudioActive: boolean;
  setIsArtStudioActive: Function;
  isIdeaLockerActive: boolean;
  setIsIdeaLockerActive: Function;
  isRecycleBinActive: boolean;
  setIsRecycleBinActive: Function;
}) {
  const [activeIcon, setActiveIcon] = useState("artStudio"); // 기본 값으로 artStudio 설정

  const toggleIcon = (iconName: string) => {
    setActiveIcon(iconName);
    setIsArtStudioActive(false);
    setIsIdeaLockerActive(false);
    setIsRecycleBinActive(false);
  };

  const { data, mutate, error, isLoading, isAdding } = useDashboardData();

  return (
    <SideTabContainer>
      <SideTabMenu>
        <LogoLink href="/dashboard">
          <Logo />
        </LogoLink>
        <SideTabLink
          onClick={() => {
            toggleIcon("artStudio");
            setIsArtStudioActive(true);
          }}
          href="/dashboard"
          $isActivated={isArtStudioActive}
        >
          {activeIcon === "artStudio" ? (
            <ActiveArtStudio />
          ) : (
            <InactiveArtStudio />
          )}
          작품 스튜디오
        </SideTabLink>
        <SideTabLink
          onClick={() => {
            toggleIcon("ideaLocker");
            setIsIdeaLockerActive(true);
          }}
          style={{ cursor: "pointer" }}
          href="/dashboard/ideaLocker"
          $isActivated={isIdeaLockerActive}
        >
          {activeIcon === "ideaLocker" ? (
            <ActiveIdeaLocker />
          ) : (
            <InactiveIdeaLocker />
          )}
          아이디어 보관함
        </SideTabLink>
        <SideTabLink
          onClick={() => {
            toggleIcon("recycleBin");
            setIsRecycleBinActive(true);
          }}
          style={{ cursor: "pointer" }}
          href="/dashboard/recycleBin"
          $isActivated={isRecycleBinActive}
        >
          {activeIcon === "recycleBin" ? (
            <ActiveRecycleBin />
          ) : (
            <InactiveRecycleBin />
          )}
          휴지통
        </SideTabLink>
      </SideTabMenu>
      {isAdding && <p>작업실 추가 중...</p>}
      {!isAdding && (
        <AddWorkspaceButton onClick={() => mutate()}>
          새 작품 집필하기
        </AddWorkspaceButton>
      )}
    </SideTabContainer>
  );
}
