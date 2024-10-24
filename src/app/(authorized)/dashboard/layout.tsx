"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
  MainContainer,
} from "@/styles/dashboard/index";
import SideTab from "@/components/dashboard/SideTab";
import Header from "@/components/dashboard/Header";
import { useState } from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isArtStudioActive, setIsArtStudioActive] = useState(true); // 기본 값으로 artStudio 설정
  const [isIdeaLockerActive, setIsIdeaLockerActive] = useState(false);
  const [isRecycleBinActive, setIsRecycleBinActive] = useState(false);

  return (
    <DashboardContainer>
      <SideTab
        isArtStudioActive={isArtStudioActive}
        isIdeaLockerActive={isIdeaLockerActive}
        isRecycleBinActive={isRecycleBinActive}
        setIsArtStudioActive={setIsArtStudioActive}
        setIsIdeaLockerActive={setIsIdeaLockerActive}
        setIsRecycleBinActive={setIsRecycleBinActive}
      />
      <HeaderAndMainContainer>
        <Header />
        <MainContainer>{children}</MainContainer>
      </HeaderAndMainContainer>
    </DashboardContainer>
  );
}
