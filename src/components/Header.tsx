import { HeaderContainer, RightMenuButton } from "@/styles/Header.styles";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Header() {
    return (
        <HeaderContainer>
            <Link href="/">
                <Logo width={150}/>
            </Link>
            <RightMenuButton>Sign in</RightMenuButton>
        </HeaderContainer>
    );
}
