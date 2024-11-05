"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
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
  const [activeContent, setactiveContent] = useState("artStudio"); // 기본 값으로 artStudio 설정

  return (
    <DashboardContainer>
      <SideTabAndFooterContainer>
        <SideTab
          activeContent={activeContent}
          setActiveContent={setactiveContent}
        />
        <FooterContainer>
          <Footer /> 로그아웃
        </FooterContainer>
      </SideTabAndFooterContainer>
      <HeaderAndMainContainer>
        <Header />
        {children}
      </HeaderAndMainContainer>
    </DashboardContainer>
  );
}
