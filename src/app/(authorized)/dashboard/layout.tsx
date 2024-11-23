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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemoEditModal from "@/components/dashboard/MemoModal";
import useIdeaBox from "@/hooks/dashboard/useIdeaBox";
import { useDeleteModal } from "@/hooks/dashboard/useDeleteModal";
import { useMemoModal } from "@/hooks/dashboard/useMemoModal";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardValue = useDashboardData();
  const ideaBoxValue = useIdeaBox();
  const deleteModalValue = useDeleteModal();
  const memoModalValue = useMemoModal();
  const contextValue = {
    dashboardData: dashboardValue,
    ideaBox: ideaBoxValue,
    deleteModal: deleteModalValue,
    memoModal: memoModalValue,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
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
      <MemoEditModal />
      <ToastContainer />
    </DashboardContext.Provider>
  );
}
