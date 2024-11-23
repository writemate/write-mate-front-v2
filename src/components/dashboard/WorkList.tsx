"use client";
import {
  WorkButtonList,
  EmptyListDiscription,
} from "@/styles/dashboard/WorkList";
import { useContext } from "react";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import WorkButton from "./WorkItem";
import { workspaceCategory } from "@/utils/APIs/types";
import { AddWork } from "./ColoredRoundButtons";

export default function WorkList() {
  const { data, error, isLoading, onClickAddWorkspace, workCategory } =
    useContext(DashboardContext);

  return (
    <>
      {isLoading && <div>로딩중...</div>}
      {error && <div>에러 발생</div>}
      {data && (
        <WorkButtonList>
          {data.length === 0 && workCategory !== workspaceCategory.trash && (
            <>
              <EmptyListDiscription>
                새로운 작품을 집필해보세요!
                <AddWork actfunction={onClickAddWorkspace} />
              </EmptyListDiscription>
            </>
          )}
          {data.length === 0 && workCategory === workspaceCategory.trash && (
            <>
              <EmptyListDiscription>
                삭제된 작품이 없습니다.
              </EmptyListDiscription>
            </>
          )}
          {!isLoading &&
            data.map((work, i) => (
              <WorkButton key={work.id} workId={work.id} />
            ))}
        </WorkButtonList>
      )}
    </>
  );
}
