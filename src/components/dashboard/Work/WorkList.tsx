"use client";
import {
  WorkButtonList,
  EmptyListDiscription,
} from "@/styles/dashboard/Work/WorkList";
import { useContext } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import WorkButton from "./WorkItem";
import { workspaceCategory } from "@/utils/APIs/types";
import {
  AddWork,
  MoveToOngoing,
} from "@/components/dashboard/Work/AddWorkButton";
import { LoadingMessage } from "@/styles/dashboard/Loading";

export default function WorkList() {
  const { data, error, isLoading, workCategory } =
    useContext(DashboardContext).workstudioAndTrash;

  return (
    <>
      {isLoading && <LoadingMessage>로딩중...</LoadingMessage>}
      {error && (
        <LoadingMessage>
          에러가 발생했습니다. 새로고침을 하시거나, 채팅 버튼을 이용해
          문의해주세요.
        </LoadingMessage>
      )}
      {data && (
        <WorkButtonList>
          {data.length === 0 && workCategory === workspaceCategory.ongoing && (
            <EmptyListDiscription>
              새로운 작품을 집필해보세요!
              <AddWork />
            </EmptyListDiscription>
          )}
          {data.length === 0 &&
            workCategory === workspaceCategory.completed && (
              <EmptyListDiscription>
                완료된 작품이 없습니다. 새로운 작품을 집필해보세요!
                <MoveToOngoing />
              </EmptyListDiscription>
            )}
          {data.length === 0 && workCategory === workspaceCategory.trash && (
            <EmptyListDiscription>
              삭제된 작품이 없습니다.
              <MoveToOngoing />
            </EmptyListDiscription>
          )}
          {!isLoading &&
            data.map((work) => <WorkButton key={work.id} workId={work.id} />)}
          {workCategory === workspaceCategory.ongoing && <AddWork />}
        </WorkButtonList>
      )}
    </>
  );
}
