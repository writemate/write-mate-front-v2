"use client";
import {
  WorkButtonList,
  EmptyListDiscription,
} from "@/styles/dashboard/WorkList";
import { useContext, useEffect } from "react";
import { AddWorkspaceButton } from "@/styles/dashboard/SideTab";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import WorkButton from "./WorkButton";
import { workspaceCategory } from "@/utils/APIs/types";

export default function WorkList() {
  const { data, error, isLoading, addWorkspace, workCategory } =
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
                <AddWorkspaceButton onClick={() => addWorkspace()}>
                  새 작품 집필하기
                </AddWorkspaceButton>
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
              <WorkButton workValue={work} key={work.id} />
            ))}
        </WorkButtonList>
      )}
    </>
  );
}
