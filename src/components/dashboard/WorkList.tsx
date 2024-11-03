"use client";
import useDashboardData from "@/hooks/dashboard/useDashboardData";
import {
  WorkButtonList,
  WorkButton,
  WorkButtonImage,
  WorkButtonTitle,
  WorkButtonDate,
  WorkButtonKebab,
} from "@/styles/dashboard/WorkList";
import KebabMenu from "@/assets/icons/KebabMenu.svg";
import { useState } from "react";
import KebabDropdownMenu from "./KebabDropdownMenu";

export default function WorkList({ isInProgress }: { isInProgress: string }) {
  const { data, mutate, error, isLoading, isAdding } = useDashboardData();
  const [isKebabMenuOpenWork, setIsKebabMenuOpenWork] = useState("");

  return (
    <>
      {isLoading && <div>로딩중...</div>}
      {error && <div>에러 발생</div>}
      {data && (
        <WorkButtonList>
          {data.map((work, i) => (
            <WorkButton key={i + 1} href={`/${work.id}/info`} passHref>
              <WorkButtonImage src={work.cover} alt={work.title} />
              <WorkButtonTitle>{work.title}</WorkButtonTitle>
              <WorkButtonDate>
                {new Date(work.updatedAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </WorkButtonDate>
              <WorkButtonKebab
                $isOpen={isKebabMenuOpenWork === work.id}
                onClick={(event) => {
                  event.preventDefault();
                  setIsKebabMenuOpenWork(work.id);
                  console.log("button");
                }}
              >
                <KebabMenu />
              </WorkButtonKebab>
              <KebabDropdownMenu
                isInProgress={isInProgress == "진행 중" ? true : false}
                work={work}
                isKebabMenuOpenWork={isKebabMenuOpenWork}
                setIsKebabMenuOpenWork={setIsKebabMenuOpenWork}
              />
            </WorkButton>
          ))}
        </WorkButtonList>
      )}
    </>
  );
}
