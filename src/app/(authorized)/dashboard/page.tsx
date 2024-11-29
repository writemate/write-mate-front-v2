"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/Work/WorkList";

export default function Dashboard() {
  return (
    <TitleAndWorkListContainer>
      <WorkStudioTitleAndNavigationBar />
      <WorkList />
    </TitleAndWorkListContainer>
  );
}
