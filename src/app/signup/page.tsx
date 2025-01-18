"use client";

import { useLogin } from "@/stores/useLogin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LogoOnly from "@/assets/logo2.svg";
import Google from "@/assets/signup/google.svg";
import Link from "next/link";
import Logo from "@/assets/logoWithText.svg";
import LoginA from "@/assets/signup/LoginA.png";
import LoginB from "@/assets/signup/LoginB.png";
import {
  BottomImage,
  DesktopSubtitle,
  DesktopTextContainer,
  DesktopTitle,
  Divider,
  FlexContainer,
  LoginButton,
  LoginContainer,
  LoginLine,
  LoginText,
  LogoContainer,
  MobileSubtitle,
  MobileTextContainer,
  MobileTitle,
  PaperImage,
  Section,
} from "@/styles/workspace/signup/Signup.style";

export default function Signup() {
  const { isLogin, login } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      <Section>
        <LogoContainer>
          <Link href={"/"}>
            <Logo width={200} />
          </Link>
        </LogoContainer>

        <BottomImage loading="eager" priority={true} src={LoginA} alt="" />
        <PaperImage loading="eager" priority={true} src={LoginB} alt="" />

        <FlexContainer>
          <DesktopTextContainer>
            <DesktopTitle>환영합니다!</DesktopTitle>
            <DesktopSubtitle>
              <span>상상만 하시던 내용을</span>
              <div style={{ fontWeight: "bold" }}>&#39;라이트메이트&#39;</div>
              <span>를 통해 집필해 보세요</span>
            </DesktopSubtitle>
          </DesktopTextContainer>

          <LoginContainer>
            <MobileTextContainer>
              <MobileTitle>환영합니다!</MobileTitle>
              <MobileSubtitle>
                <div>상상만 하시던 내용을</div>
                <div style={{ fontWeight: "700" }}>&#39;라이트메이트&#39;</div>
                <div>를 통해 집필해 보세요</div>
              </MobileSubtitle>
            </MobileTextContainer>
            <LogoOnly />
            <Divider>
              <LoginLine />
              <LoginText>로그인</LoginText>
              <LoginLine />
            </Divider>
            <LoginButton onClick={login}>
              <Google width={23} />
              <span style={{ fontSize: "16.5px", fontWeight: "550" }}>
                구글 아이디로 시작하기
              </span>
            </LoginButton>
          </LoginContainer>
        </FlexContainer>
      </Section>
    </>
  );
}
