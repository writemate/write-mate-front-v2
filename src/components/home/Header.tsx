import {
  HeaderContainer,
  RightMenuButton,
  StartButton,
} from "@/styles/home/Header.styles";
import Logo from "@/assets/logoWithText.svg";
import Link from "next/link";
import { signupAtHeader } from "@/utils/googleAnalytics/eventList";
import { useLogin } from "@/stores/useLogin";

export default function Header() {
  const isLogin = useLogin((state) => state.isLogin);
  const logout = useLogin((state) => state.logout);
  return (
    <HeaderContainer>
      <Link href="/">
        <Logo width={150} />
      </Link>
      <RightMenuButton>서비스 소개</RightMenuButton>
      {isLogin && (
        <RightMenuButton onClick={logout} style={{ marginLeft: "20px" }}>
          로그아웃
        </RightMenuButton>
      )}
      <StartButton
        tagName="button"
        eventType={signupAtHeader.type}
        eventProperties={signupAtHeader.generateProperties()}
      >
        {!isLogin && <Link href="/signup">무료로 시작하기</Link>}
        {isLogin && <Link href="/dashboard">대시보드로 이동</Link>}
      </StartButton>
    </HeaderContainer>
  );
}
