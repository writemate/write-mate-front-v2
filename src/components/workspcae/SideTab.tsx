'use client';
import { SideTabContainer } from "@/styles/workspace/SideTab.styles";
import Footer from '@/components/workspcae/Footer';
import Link from "next/link";

export default function SideTab() {
    
  return (
      <SideTabContainer>
        사이드바
        <Footer />
      </SideTabContainer>
  );
}
