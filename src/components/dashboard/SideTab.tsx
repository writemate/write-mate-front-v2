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
import ActiveIdeaBox from "@/assets/dashboard/sideTab/active/ideaBox.svg";
import ActiveTrash from "@/assets/dashboard/sideTab/active/trash.svg";
import InactiveArtStudio from "@/assets/dashboard/sideTab/inactive/artStudio.svg";
import InactiveIdeaBox from "@/assets/dashboard/sideTab/inactive/ideaBox.svg";
import InactiveTrash from "@/assets/dashboard/sideTab/inactive/trash.svg";
import { useState } from "react";
import useDashboardData from "@/hooks/dashboard/useDashboardData";

export default function SideTab({
  activeContent,
  setActiveContent,
}: {
  activeContent: string;
  setActiveContent: (activeContent: string) => void;
}) {
  const toggleIcon = (iconName: string) => {
    setActiveContent(iconName);
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
          }}
          href="/dashboard"
          $isActivated={activeContent === "artStudio"}
        >
          {activeContent === "artStudio" ? (
            <ActiveArtStudio />
          ) : (
            <InactiveArtStudio />
          )}
          작품 스튜디오
        </SideTabLink>
        <SideTabLink
          onClick={() => {
            toggleIcon("ideaBox");
          }}
          style={{ cursor: "pointer" }}
          href="/dashboard/ideaBox"
          $isActivated={activeContent === "ideaBox"}
        >
          {activeContent === "ideaBox" ? (
            <ActiveIdeaBox />
          ) : (
            <InactiveIdeaBox />
          )}
          아이디어 보관함
        </SideTabLink>
        <SideTabLink
          onClick={() => {
            toggleIcon("trash");
          }}
          style={{ cursor: "pointer" }}
          href="/dashboard/trash"
          $isActivated={activeContent === "trash"}
        >
          {activeContent === "trash" ? <ActiveTrash /> : <InactiveTrash />}
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
