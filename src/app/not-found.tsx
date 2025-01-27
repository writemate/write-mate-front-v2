"use client";

import { Subtitle, Title, WorkspaceContainer } from "@/styles/workspace";
import { PolicyLinks } from "@/styles/dashboard/MyPage.style";
import Logo from "@/assets/logoWithText.svg";
import { LogoContainer } from "@/components/Loading";

export default function NotFound() {
  return (
    <WorkspaceContainer
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Title style={{ width: "fit-content", alignItems: "center" }}>
        페이지를 찾을 수 없습니다.
        <Subtitle style={{ alignItems: "center" }}>
          링크가 올바르지 않거나, 삭제된 페이지 입니다.
        </Subtitle>
      </Title>
      <PolicyLinks>
        <a href="/">
          <>메인 페이지로 돌아가기</>
        </a>
      </PolicyLinks>
    </WorkspaceContainer>
  );
}
