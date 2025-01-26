"use client";
import {
  WorkLinkCardContainer,
  WorkButtonImage,
  WorkButtonTitle,
  WorkButtonDate,
  TitleAndDate,
  TitleAndDateAndKebab,
  WorkButtonCardContainer,
} from "@/styles/dashboard/Work/WorkList.style";
import { useContext } from "react";
import { WorkListContext } from "@/hooks/dashboard/work/workList";
import { useWorkItem } from "@/hooks/dashboard/work/useWorkItem";
import { Kebab } from "./Kebab";

export default function WorkLinkCard({ workId }: { workId: string }) {
  const { workList } = useContext(WorkListContext);
  const { titleInputRef, onChangeTitle } = useWorkItem(workId);
  const work = workList?.find((work) => work.id === workId);

  return (
    <>
      {work && (
        <WorkLinkCardContainer href={`/${work.id}/info`} passHref>
          <WorkButtonImage $url={work.cover} />
          <TitleAndDateAndKebab>
            <TitleAndDate>
              <WorkButtonTitle>
                <input
                  type="text"
                  ref={titleInputRef}
                  placeholder="작품의 제목을 적어주세요."
                  defaultValue={work.title}
                  onClick={(event) => event.preventDefault()}
                  onChange={onChangeTitle}
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
            <Kebab workId={workId} titleInputRef={titleInputRef} />
          </TitleAndDateAndKebab>
        </WorkLinkCardContainer>
      )}
    </>
  );
}

export function WorkButtonCard({ workId }: { workId: string }) {
  const { workList, onClickWorkInTrash } = useContext(WorkListContext);
  const { titleInputRef } = useWorkItem(workId);

  const work = workList?.find((work) => work.id === workId);

  return (
    <>
      {work && (
        <WorkButtonCardContainer onClick={onClickWorkInTrash}>
          <WorkButtonImage $url={work.cover} />
          <TitleAndDateAndKebab>
            <TitleAndDate>
              <WorkButtonTitle>
                <input
                  type="text"
                  ref={titleInputRef}
                  placeholder="작품의 제목을 적어주세요."
                  defaultValue={work.title}
                  onClick={(event) => event.preventDefault()}
                  readOnly
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
            <Kebab workId={workId} titleInputRef={titleInputRef} />
          </TitleAndDateAndKebab>
        </WorkButtonCardContainer>
      )}
    </>
  );
}
