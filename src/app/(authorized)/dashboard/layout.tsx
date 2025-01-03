"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
  SideTabAndFooterContainer,
  FooterContainer,
} from "@/styles/dashboard/index";
import SideTab from "@/components/dashboard/SideTab";
import Header from "@/components/dashboard/Header";
import Footer from "@/assets/dashboard/footer.svg";
import { useLogin } from "@/stores/useLogin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HamburgerMenuButton,
  HamburgerMenuContainer,
} from "@/styles/dashboard/Header";
import { useState } from "react";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useLogin((state) => state.logout);
  const [isHambugerMenuOpen, setIsHambugerMenuOpen] = useState(false);
  const onClickHamburgerMenu = () => {
    setIsHambugerMenuOpen(!isHambugerMenuOpen);
    console.log("click");
  };

  return (
    <DashboardContainer>
      <SideTabAndFooterContainer>
        <SideTab />
        <FooterContainer onClick={logout}>
          <Footer /> 로그아웃
        </FooterContainer>
        <HamburgerMenuButton onClick={onClickHamburgerMenu} />
      </SideTabAndFooterContainer>
      {isHambugerMenuOpen && (
        <HamburgerMenuContainer>
          <Header />
        </HamburgerMenuContainer>
      )}
      <HeaderAndMainContainer>
        {!isHambugerMenuOpen && <Header />}
        {children}
      </HeaderAndMainContainer>
      <DevTool />
    </DashboardContainer>
  );
}

function DevTool() {
  return <ReactQueryDevtools />;
}
