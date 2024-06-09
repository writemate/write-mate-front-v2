import { HeaderContainer, RightMenuButton, StartButton } from "@/styles/Header.styles";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { signupAtHeader } from "@/utils/googleAnalytics/eventList";

export default function Header() {
    return (
        <HeaderContainer>
            <Link href="/">
                <Logo width={150}/>
            </Link>
            <RightMenuButton title="서비스 소개">서비스 소개</RightMenuButton>
            <StartButton tagName='button'
                eventType={signupAtHeader.type} eventProperties={signupAtHeader.generateProperties()}>
                <Link href="/signup">
                    무료로 시작하기
                </Link>
            </StartButton>
        </HeaderContainer>
    );
}
