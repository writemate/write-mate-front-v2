'use client';
import { useLogin } from "@/stores/useLogin";
import { FooterContainer } from "@/styles/workspace/Footer.styles";
import Link from "next/link";

export default function Footer() {
    const { logout } = useLogin();
    
    return (
        <FooterContainer>
            <button onClick={logout}>로그아웃</button>
        </FooterContainer>
    );
}
