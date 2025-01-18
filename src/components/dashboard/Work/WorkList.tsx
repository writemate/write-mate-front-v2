"use client";
import {
  WorkListContainer,
  EmptyListDiscription,
} from "@/styles/dashboard/Work/WorkList.style";
import { useContext } from "react";
import WorkButton from "./WorkItem";
import { workspaceCategory } from "@/utils/APIs/types";
import { AddWork, MoveToOngoing } from "@/components/dashboard/Work/Button";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { WorkListContext } from "@/hooks/dashboard/work/workList";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";

export default function WorkList() {
  const { workCategory } = useContext(WorkCategoryContext);
  const { workList, error, isLoading } = useContext(WorkListContext);

  return (
    <>
      {isLoading && <LoadingMessage>로딩중...</LoadingMessage>}
      {error && (
        <LoadingMessage>
          에러가 발생했습니다. <br />
          새로고침을 하시거나, 채팅 버튼을 이용해 문의해주세요.
        </LoadingMessage>
      )}
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
                <EmptyListDiscription>
                  새로운 작품을 집필해보세요!
                  <AddWork />
                </EmptyListDiscription>
              )}
              {workCategory === workspaceCategory.completed && (
                <EmptyListDiscription>
                  완료된 작품이 없습니다. <br />
                  새로운 작품을 집필해보세요!
                  <MoveToOngoing />
                </EmptyListDiscription>
              )}
              {workCategory === workspaceCategory.trash && (
                <EmptyListDiscription>
                  휴지통이 비어있습니다.
                  <MoveToOngoing />
                </EmptyListDiscription>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
