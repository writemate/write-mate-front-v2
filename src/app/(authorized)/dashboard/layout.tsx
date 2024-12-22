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
import { DashboardContext, useWorkCategory } from "@/hooks/dashboard/work/dashboard";
import DeleteModal from "@/components/DeleteModal";
import MemoCharacterEditModal from "@/components/dashboard/MCharacter/MCharacterModal";
import MemoEditModal from "@/components/dashboard/Memo/MemoModal";
import useIdeaBoxMemo from "@/hooks/dashboard/useIdeaBoxMemo";
import useOpenAndCloseDeleteConfirmation from "@/hooks/dashboard/useDeleteConfirmModal";
import useMemoModal from "@/hooks/dashboard/useMemoModal";
import useIdeaBoxMemoCharacter from "@/hooks/dashboard/useIdeaBoxMCharacter";
import useMemoCharacterModal from "@/hooks/dashboard/useMCharacterModal";
import { useLogin } from "@/stores/useLogin";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const dashboardValue = useWorkCategory();
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

  const logout = useLogin((state) => state.logout);

  return (
    <DashboardContext.Provider value={contextValue}>
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
      </DashboardContainer>
      <Modal />
      <DevTool />
    </DashboardContext.Provider>
  );
}

function Modal() {
  return (
    <>
      <MemoEditModal />
      <MemoCharacterEditModal />
      <DeleteModal />
    </>
  );
}

function DevTool() {
  return <ReactQueryDevtools />;
}
