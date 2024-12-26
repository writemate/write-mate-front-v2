"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { TrashTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/Work/WorkList";
import { useContext } from "react";
import { useWorkList, WorkListContext } from "@/hooks/dashboard/work/workList";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";

export default function Dashboard() {
  const { workCategory } = useContext(WorkCategoryContext);
  const WorkListValue = useWorkList(workCategory);

  return (
    <TitleAndWorkListContainer>
      <TrashTitleAndNavigationBar />
      <WorkListContext.Provider value={WorkListValue}>
        <WorkList />
      </WorkListContext.Provider>
    </TitleAndWorkListContainer>
  );
}
