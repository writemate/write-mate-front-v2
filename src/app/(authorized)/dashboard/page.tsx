"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { WorkStudioTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import WorkList from "@/components/dashboard/Work/WorkList";
import { useWorkList, WorkListContext } from "@/hooks/dashboard/work/workList";
import {
  useWorkCategory,
  WorkCategoryContext,
} from "@/hooks/dashboard/work/workCategory";

export default function Dashboard() {
  const workCategoryValue = useWorkCategory();
  const { workCategory } = workCategoryValue;
  const WorkListValue = useWorkList(workCategory);

  return (
    <TitleAndWorkListContainer>
      <WorkCategoryContext.Provider value={workCategoryValue}>
        <WorkStudioTitleAndNavigationBar />
        <WorkListContext.Provider value={WorkListValue}>
          <WorkList />
        </WorkListContext.Provider>
      </WorkCategoryContext.Provider>
    </TitleAndWorkListContainer>
  );
}
