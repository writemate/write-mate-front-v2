"use client";
import {
  AddWorkspaceButton,
  LogoLink,
  SideTabContainer,
  SideTabLink,
  SideTabMenu,
} from "@/styles/dashboard/SideTab";
import Logo from "@/assets/logo.svg";
import LogoWithText from "@/assets/logoWithText.svg";
import ArtStudio from "@/assets/dashboard/sideTab/artStudio.svg";
import IdeaBox from "@/assets/dashboard/sideTab/ideaBox.svg";
import Trash from "@/assets/dashboard/sideTab/trash.svg";

import { usePathname } from "next/navigation";
import { useWorkList } from "@/hooks/dashboard/work/workList";
import { workspaceCategory } from "@/utils/APIs/types";

export default function SideTab() {
  const { onClickAddWork } = useWorkList(workspaceCategory.ongoing);

  return (
    <SideTabContainer>
      <LogoLink href="/dashboard">
        <Logo className="logo-small" />
        <LogoWithText className="logo-full" />{" "}
      </LogoLink>
      <SideTabMenu>
        <SideTabLink
          href="/dashboard"
          $isActivated={usePathname() === "/dashboard"}
        >
          <ArtStudio />
          작품 스튜디오
        </SideTabLink>
        <SideTabLink
          href="/dashboard/ideaBox"
          $isActivated={usePathname() === "/dashboard/ideaBox"}
        >
          <IdeaBox />
          아이디어 보관함
        </SideTabLink>
        <SideTabLink
          href="/dashboard/trash"
          $isActivated={usePathname() === "/dashboard/trash"}
        >
          <Trash />
          휴지통
        </SideTabLink>
      </SideTabMenu>
      <AddWorkspaceButton onClick={onClickAddWork}>
        새 작품 집필하기
      </AddWorkspaceButton>
    </SideTabContainer>
  );
}
