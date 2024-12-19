"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { TrashTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WorkList from "@/components/dashboard/Work/WorkList";

export default function Dashboard() {
  return (
    <TitleAndWorkListContainer>
      <TrashTitleAndNavigationBar />
      <WorkList />
    </TitleAndWorkListContainer>
  );
}
