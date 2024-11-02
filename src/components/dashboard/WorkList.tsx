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

export default function WorkList({ isInProgress }: { isInProgress: boolean }) {
  const { data, mutate, error, isLoading, isAdding } = useDashboardData();

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
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  console.log("button");
                }}
              >
                <KebabMenu />
              </WorkButtonKebab>
            </WorkButton>
          ))}
        </WorkButtonList>
      )}{" "}
    </>
  );
}
