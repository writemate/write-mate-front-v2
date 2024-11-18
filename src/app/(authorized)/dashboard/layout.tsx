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
import {
  DashboardContext,
  useDashboardData,
} from "@/hooks/dashboard/dashboard";
import DeleteModal from "@/components/DeleteModal";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useDashboardData();

  return (
    <DashboardContext.Provider value={value}>
      <DashboardContainer>
        <SideTabAndFooterContainer>
          <SideTab />
          <FooterContainer>
            <Footer /> 로그아웃
          </FooterContainer>
        </SideTabAndFooterContainer>
        <HeaderAndMainContainer>
          <Header />
          {children}
        </HeaderAndMainContainer>
      </DashboardContainer>
      <DeleteModal />
    </DashboardContext.Provider>
  );
}
