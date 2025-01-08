"use client";
import {
  HeaderContainer,
  HeaderTitle,
  SaveStatus,
  VersionControlButton,
  RightContainer,
  GuideButton,
  IdeaBoxButton,
  DownloadButton,
  ProfileButton,
} from "@/styles/workspace/Header.styles";
import RightArrow from "@/assets/icons/rightArrow.svg";
import useWorkspaceHeader from "@/hooks/workspace/useWorkspaceHeader";
import { useSaveLoading } from "@/stores/useSaveLoading";
import SavingIcon from "@/assets/icons/saving.svg";
import SavedIcon from "@/assets/icons/saved.svg";
import Modal from "../Modal";
import {
  DangerIcon,
  ButtonContainer,
  ModalButton,
  ModalContainer,
} from "@/styles/WarningModal";

export default function Header({
  toggleIdeaBox,
}: {
  toggleIdeaBox: () => void;
}) {
  const {
    data,
    error,
    isLoading,
    isOpenVersionControl,
    onClickVersionControl,
  } = useWorkspaceHeader();
  const isSaving = useSaveLoading().checkIsSaving();

  return (
    <HeaderContainer>
      <HeaderTitle>
        {data?.title}
        {isLoading && "로딩 중..."}
      </HeaderTitle>
      <SaveStatus>
        {isSaving ? "저장 중" : "저장 완료"}
        {isSaving ? <SavingIcon /> : <SavedIcon />}
      </SaveStatus>
      <VersionControlButton onClick={onClickVersionControl}>
        버전 관리
        <RightArrow />
      </VersionControlButton>
      {isOpenVersionControl && <VersionControl />}
      <RightContainer>
        <GuideButton /> 가이드
        <IdeaBoxButton onClick={toggleIdeaBox} /> 아이디어 보관함
        <DownloadButton /> txt 저장
        <ProfileButton /> 마이페이지
      </RightContainer>
    </HeaderContainer>
  );
}

export function VersionControl() {
  const { closeVersionControl } = useWorkspaceHeader();
  return (
    <Modal closeModal={closeVersionControl} maxWidth="450px">
      <ModalContainer>
        <p>버전 관리 기능은 추후 업데이트 됩니다.</p>
        <p>조금만 기다려주세요!</p>
        <ButtonContainer>
          <ModalButton $isDanger={false} onClick={closeVersionControl}>
            알겠습니다!
          </ModalButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
}
