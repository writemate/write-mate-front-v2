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
  useWorkstudioAndTrash,
} from "@/hooks/dashboard/dashboard";
import DeleteModal from "@/components/DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MemoEditModal from "@/components/dashboard/MemoModal";
import useIdeaBox from "@/hooks/dashboard/useIdeaBox";
import useOpenAndCloseDeleteConfirmation from "@/hooks/dashboard/useDeleteModal";
import useMemoModal from "@/hooks/dashboard/useMemoModal";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardValue = useWorkstudioAndTrash();
  const ideaBoxValue = useIdeaBox();
  const deleteModalValue = useOpenAndCloseDeleteConfirmation();
  const memoModalValue = useMemoModal();
  const contextValue = {
    workstudioAndTrash: dashboardValue,
    ideaBox: ideaBoxValue,
    removeConfirmationModal: deleteModalValue,
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
      <MemoEditModal />
      <DeleteModal />
      <ToastContainer />
    </DashboardContext.Provider>
  );
}
