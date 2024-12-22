"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/Work/WorkList";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { useContext } from "react";
import { useWorkList, WorkListContext } from "@/hooks/dashboard/work/useWorkList";

export default function Dashboard() {
  const { workCategory } = useContext(DashboardContext).workstudioAndTrash;
  const WorkListValue = useWorkList({ workCategory });

  return (
    <TitleAndWorkListContainer>
      <WorkStudioTitleAndNavigationBar />
      <WorkListContext.Provider value={WorkListValue}>
        <WorkList />
      </WorkListContext.Provider>
    </TitleAndWorkListContainer>
  );
}
