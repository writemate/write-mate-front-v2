"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/WorkList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Dashboard() {
  return (
    <TitleAndWorkListContainer>
      <ReactQueryDevtools />
      <WorkStudioTitleAndNavigationBar />
      <WorkList />
    </TitleAndWorkListContainer>
  );
}
