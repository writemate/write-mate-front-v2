"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/WorkList";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MemoList } from "@/components/dashboard/IdeaList";

export default function Dashboard() {
  return (
    <TitleAndWorkListContainer>
      <ReactQueryDevtools />
      <IdeaBoxTitleAndNavigationBar />
      <MemoList />
    </TitleAndWorkListContainer>
  );
}
