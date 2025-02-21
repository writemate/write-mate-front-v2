"use client";
import { useLogin } from "@/stores/useLogin";
import { FooterContainer } from "@/styles/workspace/Footer.styles";

export default function Footer() {
  const { logout } = useLogin();

  return <FooterContainer></FooterContainer>;
}
