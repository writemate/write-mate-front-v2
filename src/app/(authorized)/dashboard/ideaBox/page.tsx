"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import MemoList from "@/components/dashboard/IdeaBox/Memo/MemoList";
import { useContext } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import CharacterList from "@/components/dashboard/IdeaBox/MCharacter/MCharacterList";

export default function Dashboard() {
  const { ideaCategory } = useContext(DashboardContext).ideaBoxMemo;

  return (
    <TitleAndWorkListContainer>
      <IdeaBoxTitleAndNavigationBar />
      {ideaCategory == "memo" && <MemoList />}
      {ideaCategory == "character" && <CharacterList />}
    </TitleAndWorkListContainer>
  );
}
