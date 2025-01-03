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
import Link from "next/link";
import RightArrow from "@/assets/icons/rightArrow.svg";
import useWorkspaceHeader from "@/hooks/workspace/useWorkspaceHeader";
import { useSaveLoading } from "@/stores/useSaveLoading";

export default function Header({
  toggleIdeaBox,
}: {
  toggleIdeaBox: () => void;
}) {
  const { data, error, isLoading } = useWorkspaceHeader();
  const isSaving = useSaveLoading().checkIsSaving();

  return (
    <HeaderContainer>
      <HeaderTitle>
        {data?.title}
        {isLoading && "로딩 중..."}
      </HeaderTitle>
      <SaveStatus>
        {isSaving ? "저장 중" : "저장 완료"}
        {/*TODO: 아이콘 들어가야함 */}
      </SaveStatus>
      <VersionControlButton>
        버전 관리
        <RightArrow />
      </VersionControlButton>
      <RightContainer>
        {/*TODO: 맞는 아이콘으로 교체해야함 */}
        <GuideButton /> 가이드
        <IdeaBoxButton onClick={toggleIdeaBox} /> 아이디어 보관함
        <DownloadButton /> txt 저장
        <ProfileButton /> 마이페이지
      </RightContainer>
    </HeaderContainer>
  );
}
