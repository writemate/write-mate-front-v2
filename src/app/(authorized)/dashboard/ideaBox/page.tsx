"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/WorkList";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MemoList from "@/components/dashboard/Memo/MemoList";
import { useContext } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import CharacterList from "@/components/dashboard/Character/MCharacterList";

export default function Dashboard() {
  const { ideaCategory } = useContext(DashboardContext).ideaBoxMemo;

  return (
    <TitleAndWorkListContainer>
      <ReactQueryDevtools />
      <IdeaBoxTitleAndNavigationBar />
      {ideaCategory == "memo" && <MemoList />}
      {ideaCategory == "character" && <CharacterList />}
    </TitleAndWorkListContainer>
  );
}
