"use client";
import {
  DashboardContainer,
  HeaderAndMainContainer,
  SideTabAndFooterContainer,
  FooterContainer,
} from "@/styles/dashboard";
import {
  TabletHeaderButton,
  TabletHeaderMenuContainer,
} from "@/styles/dashboard/Header.style";
import SideTab from "@/components/dashboard/SideTab";
import Header from "@/components/dashboard/Header";
import Footer from "@/assets/dashboard/footer.svg";
import { useLogin } from "@/stores/useLogin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { MyPageContext, useMyPage } from "@/hooks/dashboard/useMyPage";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useLogin((state) => state.logout);
  const myPageValue = useMyPage();

  const [isTabletHeaderMenuOpen, setIsHambugerMenuOpen] = useState(false);
  const onClickHamburgerMenu = () => {
    setIsHambugerMenuOpen(!isTabletHeaderMenuOpen);
    console.log("click");
  };

  return (
    <DashboardContainer>
      <MyPageContext.Provider value={myPageValue}>
        <SideTabAndFooterContainer>
          <SideTab />
          <FooterContainer onClick={logout}>
            <Footer /> 로그아웃
          </FooterContainer>
          <TabletHeaderButton onClick={onClickHamburgerMenu} />
        </SideTabAndFooterContainer>
        {isTabletHeaderMenuOpen && (
          <TabletHeaderMenuContainer>
            <Header />
          </TabletHeaderMenuContainer>
        )}
        <HeaderAndMainContainer>
          {!isTabletHeaderMenuOpen && <Header />}
          {children}
        </HeaderAndMainContainer>
      </MyPageContext.Provider>
      <DevTool />
    </DashboardContainer>
  );
}

function DevTool() {
  return <ReactQueryDevtools />;
}
