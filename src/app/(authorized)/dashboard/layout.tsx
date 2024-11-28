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
import MemoCharacterEditModal from "@/components/dashboard/IdeaBox/MCharacter/MCharacterModal";
import MemoEditModal from "@/components/dashboard/IdeaBox/Memo/MemoModal";
import useIdeaBoxMemo from "@/hooks/dashboard/useIdeaBoxMemo";
import useOpenAndCloseDeleteConfirmation from "@/hooks/dashboard/useDeleteConfirmModal";
import useMemoModal from "@/hooks/dashboard/useMemoModal";
import useIdeaBoxMemoCharacter from "@/hooks/dashboard/useIdeaBoxMCharacter";
import useMemoCharacterModal from "@/hooks/dashboard/useMCharacterModal";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dashboardValue = useWorkstudioAndTrash();
  const ideaBoxMemoValue = useIdeaBoxMemo();
  const ideaBoxMemoCharacterValue = useIdeaBoxMemoCharacter();
  const memoModalValue = useMemoModal();
  const memoCharacterModalValue = useMemoCharacterModal();
  const deleteConfirmModalValue = useOpenAndCloseDeleteConfirmation();
  const contextValue = {
    workstudioAndTrash: dashboardValue,
    ideaBoxMemo: ideaBoxMemoValue,
    ideaBoxMCharacter: ideaBoxMemoCharacterValue,
    removeConfirmationModal: deleteConfirmModalValue,
    memoModal: memoModalValue,
    memoCharacterModal: memoCharacterModalValue,
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
      <MemoCharacterEditModal />
      <DeleteModal />
      <ToastContainer />
    </DashboardContext.Provider>
  );
}
