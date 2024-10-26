"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
  MainContainer,
  SideTabAndFooterContainer,
  FooterContainer,
} from "@/styles/dashboard/index";
import SideTab from "@/components/dashboard/SideTab";
import Header from "@/components/dashboard/Header";
import { useState } from "react";
import Footer from "@/assets/dashboard/footer.svg";
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
      <SideTabAndFooterContainer>
        <SideTab
          isArtStudioActive={isArtStudioActive}
          isIdeaLockerActive={isIdeaLockerActive}
          isRecycleBinActive={isRecycleBinActive}
          setIsArtStudioActive={setIsArtStudioActive}
          setIsIdeaLockerActive={setIsIdeaLockerActive}
          setIsRecycleBinActive={setIsRecycleBinActive}
        />
        <FooterContainer>
          <Footer /> 로그아웃
        </FooterContainer>
      </SideTabAndFooterContainer>

      <HeaderAndMainContainer>
        <Header />
        <MainContainer>{children}</MainContainer>
      </HeaderAndMainContainer>
    </DashboardContainer>
  );
}
