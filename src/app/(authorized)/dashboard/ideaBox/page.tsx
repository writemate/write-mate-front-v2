"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/WorkList";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MemoList from "@/components/dashboard/MemoList";
import { IdeaBoxContext, useIdeaBox } from "@/hooks/dashboard/ideaBox";

export default function Dashboard() {
  const value = useIdeaBox();

  return (
    <IdeaBoxContext.Provider value={value}>
      <TitleAndWorkListContainer>
        <ReactQueryDevtools />
        <IdeaBoxTitleAndNavigationBar />
        <MemoList />
      </TitleAndWorkListContainer>
    </IdeaBoxContext.Provider>
  );
}
