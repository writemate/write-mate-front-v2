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

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useLogin((state) => state.logout);

  return (
    <DashboardContainer>
      <SideTabAndFooterContainer>
        <SideTab />
        <FooterContainer onClick={logout}>
          <Footer /> 로그아웃
        </FooterContainer>
      </SideTabAndFooterContainer>
      <HeaderAndMainContainer>
        <Header />
        {children}
      </HeaderAndMainContainer>
      <DevTool />
    </DashboardContainer>
  );
}

function DevTool() {
  return <ReactQueryDevtools />;
}
