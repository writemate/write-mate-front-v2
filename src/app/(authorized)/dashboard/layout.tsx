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
} from "@/hooks/dashboard/workStudioAndTrash";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer />
    </DashboardContext.Provider>
  );
}
