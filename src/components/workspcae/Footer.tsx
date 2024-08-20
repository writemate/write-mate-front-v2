'use client';
import { useLogin } from "@/stores/useLogin";
import {  } from "@/styles/workspace/Footer.styles";
import Link from "next/link";

export default function Footer() {
    const { logout } = useLogin();
    
    return (
        <>
            <button onClick={logout}>로그아웃</button>
        </>
    );
}
