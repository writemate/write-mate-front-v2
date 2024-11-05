'use client';
import { HeaderContainer, HeaderTitle, SaveStatus, VersionControlButton, 
  RightContainer, GuideButton, IdeaBoxButton, DownloadButton, ProfileButton
 } from "@/styles/workspace/Header.styles";
import Link from "next/link";
import RightArrow from "@/assets/icons/rightArrow.svg";
import useWorkspaceHeader from "@/hooks/workspace/useWorkspaceHeader";

export default function Header({toggleIdeaBox}: {toggleIdeaBox: () => void}) {
  const { data, error, isLoading } = useWorkspaceHeader();

  return ( 
    <HeaderContainer>
      <HeaderTitle>
        {data?.title}
        {isLoading && "로딩중..."}
      </HeaderTitle>
      <SaveStatus>
        저장 완료
        {/*TODO: 아이콘 들어가야함 */}
      </SaveStatus>
      <VersionControlButton>
        버전 관리
        <RightArrow />
      </VersionControlButton>
      <RightContainer>
        {/*TODO: 맞는 아이콘으로 교체해야함 */}
        <GuideButton />
        <IdeaBoxButton onClick={toggleIdeaBox}/>
        <DownloadButton />
        <ProfileButton />
      </RightContainer>
    </HeaderContainer>
  );
}
