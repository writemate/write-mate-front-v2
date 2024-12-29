"use client";
import {
  SideTabContainer,
  LogoLink,
  SideTabLink,
  SideTabMenu,
  AddWorkspaceButton,
  HamburgerMenuButton,
  HamburgerMenuContainer,
} from "@/styles/dashboard/SideTab";
import Logo from "@/assets/dashboard/sideTab/logo.svg";
import ActiveArtStudio from "@/assets/dashboard/sideTab/active/artStudio.svg";
import ActiveIdeaBox from "@/assets/dashboard/sideTab/active/ideaBox.svg";
import ActiveTrash from "@/assets/dashboard/sideTab/active/trash.svg";
import InactiveArtStudio from "@/assets/dashboard/sideTab/inactive/artStudio.svg";
import InactiveIdeaBox from "@/assets/dashboard/sideTab/inactive/ideaBox.svg";
import InactiveTrash from "@/assets/dashboard/sideTab/inactive/trash.svg";

import { usePathname } from "next/navigation";
import { useWorkList } from "@/hooks/dashboard/work/workList";
import { workspaceCategory } from "@/utils/APIs/types";
import { useState } from "react";
import Header from "./Header";

export default function SideTab() {
  const { onClickAddWork } = useWorkList(workspaceCategory.ongoing);
  const [isHambugerMenuOpen, setIsHambugerMenuOpen] = useState(false);
  const onClickHamburgerMenu = () => {
    setIsHambugerMenuOpen(!isHambugerMenuOpen);
    console.log("click");
  };

  return (
    <>
      <SideTabContainer>
        <LogoLink href="/dashboard">
          <Logo />
        </LogoLink>

        <SideTabMenu>
          <SideTabLink
            href="/dashboard"
            $isActivated={usePathname() === "/dashboard"}
          >
            {usePathname() === "/dashboard" ? (
              <ActiveArtStudio />
            ) : (
              <InactiveArtStudio />
            )}
            <p>작품 스튜디오</p>
          </SideTabLink>
          <SideTabLink
            href="/dashboard/ideaBox"
            $isActivated={usePathname() === "/dashboard/ideaBox"}
          >
            {usePathname() === "/dashboard/ideaBox" ? (
              <ActiveIdeaBox />
            ) : (
              <InactiveIdeaBox />
            )}
            <p>아이디어 보관함</p>
          </SideTabLink>
          <SideTabLink
            href="/dashboard/trash"
            $isActivated={usePathname() === "/dashboard/trash"}
          >
            {usePathname() === "/dashboard/trash" ? (
              <ActiveTrash />
            ) : (
              <InactiveTrash />
            )}
            <p>휴지통</p>
          </SideTabLink>
        </SideTabMenu>
        <HamburgerMenuButton onClick={onClickHamburgerMenu} />

        <AddWorkspaceButton onClick={onClickAddWork}>
          새 작품 집필하기
        </AddWorkspaceButton>
      </SideTabContainer>
      {isHambugerMenuOpen && (
        <HamburgerMenuContainer>
          <Header />
        </HamburgerMenuContainer>
      )}
    </>
  );
}
