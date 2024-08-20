'use client';
import { HeaderContainer, HeaderTitle, SaveStatus, VersionControlButton, RightContainer } from "@/styles/workspace/Header.styles";
import Link from "next/link";
import RightArrow from "@/assets/workspace/RightArrow.svg";
import { useLogin } from "@/stores/useLogin";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderTitle>예시 제목</HeaderTitle>
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
        <RightArrow />
        <RightArrow />
        <RightArrow />
        <RightArrow />
      </RightContainer>
    </HeaderContainer>
  );
}
