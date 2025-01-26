"use client";
import {
  HeaderContainer,
  HeaderTitle,
  SaveStatus,
  VersionControlButton,
  RightContainer,
} from "@/styles/workspace/Header.styles";
import IdeaBox from "@/assets/icons/ideabox.svg";
import Help from "@/assets/dashboard/header/help.svg";
import RightArrow from "@/assets/icons/rightArrow.svg";
import useWorkspaceHeader from "@/hooks/workspace/useWorkspaceHeader";
import { useSaveLoading } from "@/stores/useSaveLoading";
import SavingIcon from "@/assets/icons/saving.svg";
import SavedIcon from "@/assets/icons/saved.svg";
import HeaderSeparator from "@/assets/icons/headerSeparator.svg";
import Profile from "@/assets/dashboard/header/profile.svg";
import Modal from "../Modal";
import {
  ButtonContainer,
  ModalButton,
  ModalContainer,
} from "@/styles/WarningModal";
import { MyPageContext, useMyPage } from "@/hooks/dashboard/useMyPage";
import {
  HeaderRightButton,
  HearderProfileButton,
} from "@/styles/dashboard/Header.style";
import { MyPageModal } from "../dashboard/MyPageModal";

export default function Header({
  toggleIdeaBox,
}: {
  toggleIdeaBox: () => void;
}) {
  const {
    work,
    subTitle,
    workIsLoading,
    isOpenVersionControl,
    onClickVersionControl,
    closeVersionControl,
  } = useWorkspaceHeader();
  const isSaving = useSaveLoading().checkIsSaving();
  const myPageValue = useMyPage();
  const { isOpenMyPage, onClickMyPage } = myPageValue;

  return (
    <HeaderContainer>
      <HeaderTitle>
        {work?.title}
        <HeaderSeparator />
        {subTitle}
        {workIsLoading && "로딩 중..."}
      </HeaderTitle>
      <SaveStatus>
        {isSaving ? "저장 중" : "저장 완료"}
        {isSaving ? <SavingIcon style={{ width: 20 }} /> : <SavedIcon />}
      </SaveStatus>
      <VersionControlButton onClick={onClickVersionControl}>
        버전 관리
        <RightArrow />
      </VersionControlButton>
      {isOpenVersionControl && (
        <VersionControl closeVersionControl={closeVersionControl} />
      )}
      <RightContainer>
        <HeaderRightButton
          onClick={() => {
            window.open("https://guide.write-mate.net/", "_blank");
          }}
        >
          <Help /> <p>도움말</p>
        </HeaderRightButton>
        <HeaderRightButton onClick={toggleIdeaBox}>
          <IdeaBox />
        </HeaderRightButton>
        {/* <DownloadButton /> txt 저장 */}
        <MyPageContext.Provider value={myPageValue}>
          <HearderProfileButton onClick={onClickMyPage}>
            <Profile />
            <p>프로필</p>
          </HearderProfileButton>
          {isOpenMyPage && <MyPageModal />}
        </MyPageContext.Provider>
      </RightContainer>
    </HeaderContainer>
  );
}

export function VersionControl({
  closeVersionControl,
}: {
  closeVersionControl: () => void;
}) {
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
