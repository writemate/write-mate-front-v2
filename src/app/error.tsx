"use client";

import { Subtitle, Title, WorkspaceContainer } from "@/styles/workspace";
import { PolicyLinks } from "@/styles/dashboard/MyPage.style";
import Logo from "@/assets/logoWithText.svg";
import { LogoContainer } from "@/components/Loading";

export default function Error() {
  return (
    <WorkspaceContainer
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Title style={{ width: "fit-content", alignItems: "center" }}>
        에러가 발생했습니다.
        <Subtitle style={{ alignItems: "center" }}>
          에러가 지속된다면 문의하기를 이용해 주세요
        </Subtitle>
      </Title>
      <PolicyLinks>
        <a href="/">
          <>메인 페이지</>
        </a>
        <span style={{ margin: "0 1rem", color: "#000000" }}>|</span>
        <a
          href="#"
          onClick={() => {
            window.open("http://pf.kakao.com/_lrfTG/chat", "_blank");
          }}
        >
          <>문의하기</>
        </a>
      </PolicyLinks>
    </WorkspaceContainer>
  );
}
