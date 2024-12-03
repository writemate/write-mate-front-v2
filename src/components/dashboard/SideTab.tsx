"use client";
import {
  SideTabContainer,
  LogoLink,
  SideTabLink,
  SideTabMenu,
  AddWorkspaceButton,
} from "@/styles/dashboard/SideTab";
import Logo from "@/assets/dashboard/sideTab/logo.svg";
import ActiveArtStudio from "@/assets/dashboard/sideTab/active/artStudio.svg";
import ActiveIdeaBox from "@/assets/dashboard/sideTab/active/ideaBox.svg";
import ActiveTrash from "@/assets/dashboard/sideTab/active/trash.svg";
import InactiveArtStudio from "@/assets/dashboard/sideTab/inactive/artStudio.svg";
import InactiveIdeaBox from "@/assets/dashboard/sideTab/inactive/ideaBox.svg";
import InactiveTrash from "@/assets/dashboard/sideTab/inactive/trash.svg";

import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function SideTab() {
  const { onClickAddWorkspace, isAdding } =
    useContext(DashboardContext).workstudioAndTrash;

  return (
    <>
      <SideTabContainer>
        <SideTabMenu>
          <LogoLink href="/dashboard">
            <Logo />
          </LogoLink>
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
        {isAdding && <p>작업실 추가 중...</p>}
        {!isAdding && <AddWork actfunction={onClickAddWorkspace} />}
      </SideTabContainer>
    </>
  );
}

function AddWork({ actfunction }: { actfunction: () => void }) {
  return (
    <AddWorkspaceButton
      onClick={() => {
        actfunction();
      }}
    >
      새 작품 집필하기
    </AddWorkspaceButton>
  );
}
