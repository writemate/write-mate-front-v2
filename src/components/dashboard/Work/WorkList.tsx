"use client";
import { WorkListContainer } from "@/styles/dashboard/Work/WorkList.style";
import { useContext } from "react";
import WorkButton from "./WorkItem";
import { workspaceCategory } from "@/utils/APIs/types";
import { AddWork, MoveToOngoing } from "@/components/dashboard/Work/Button";
import { WorkListContext } from "@/hooks/dashboard/work/workList";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import { StateMessage } from "@/components/EmptyMessage";

export default function WorkList() {
  const { workCategory } = useContext(WorkCategoryContext);
  const { workList, error, isLoading } = useContext(WorkListContext);

  return (
    <>
      {isLoading && <StateMessage messageKey="LOADING" />}
      {error && <StateMessage messageKey="LOADING_ERROR" />}
      {workList && (
        <>
          {workList.length > 0 && (
            <>
              <WorkListContainer>
                {!isLoading &&
                  workList.map((work) => (
                    <WorkButton key={work.id} workId={work.id} />
                  ))}
              </WorkListContainer>
              {workCategory === workspaceCategory.ongoing && <AddWork />}
            </>
          )}
          {workList.length === 0 && (
            <>
              {workCategory === workspaceCategory.ongoing && (
                <StateMessage messageKey="ONGOING_EMPTY">
                  <AddWork />
                </StateMessage>
              )}
              {workCategory === workspaceCategory.completed && (
                <StateMessage messageKey="COMPLETED_EMPTY">
                  <MoveToOngoing />
                </StateMessage>
              )}
              {workCategory === workspaceCategory.trash && (
                <StateMessage messageKey="TRASH_EMPTY">
                  <MoveToOngoing />
                </StateMessage>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
