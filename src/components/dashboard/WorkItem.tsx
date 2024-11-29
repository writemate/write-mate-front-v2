"use client";
import {
  WorkButtonContainer,
  WorkButtonImage,
  WorkButtonTitle,
  WorkButtonDate,
  TitleAndDate,
  TitleAndDateAndKebab,
} from "@/styles/dashboard/WorkList";
import { useContext, useRef } from "react";
import Kebab from "./KebabMenu";
import useWork from "@/hooks/dashboard/useWork";
import { DashboardContext } from "@/hooks/dashboard/dashboard";

export default function WorkItem({ workId }: { workId: string }) {
  const { data } = useContext(DashboardContext).workstudioAndTrash;
  const work = data?.find((work) => work.id === workId);
  const { onChangeTitle, onBlurTitle, onKeyDownTitle } = useWork(workId);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {work && (
        <WorkButtonContainer href={`/${work.id}/info`} passHref>
          <WorkButtonImage src={work.cover} alt={work.title} />
          <TitleAndDateAndKebab>
            <TitleAndDate>
              <WorkButtonTitle>
                <input
                  type="text"
                  ref={inputRef}
                  placeholder="작품의 제목을 적어주세요."
                  defaultValue={work.title}
                  onClick={(event) => event.preventDefault()}
                  onChange={(event) => {
                    onChangeTitle(event);
                  }}
                  onBlur={onBlurTitle}
                  onKeyDown={(event) => {
                    onKeyDownTitle(event);
                  }}
                />
              </WorkButtonTitle>
              <WorkButtonDate>
                {new Date(work.updatedAt).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </WorkButtonDate>
            </TitleAndDate>
            <Kebab workValue={work} inputRef={inputRef} />
          </TitleAndDateAndKebab>
        </WorkButtonContainer>
      )}
    </>
  );
}
