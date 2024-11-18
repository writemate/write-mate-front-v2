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
import Kebab from "./Kebab";
import { DashboardContext } from "@/hooks/dashboard/dashboard";
import { useWork } from "@/hooks/dashboard/useWork";

export default function WorkList({
  workValue,
}: {
  workValue: {
    id: string;
    title: string;
    cover: string;
    updatedAt: string;
  };
}) {
  const { onChangeTitle, onBlurTitle, onKeyDownTitle } = useWork(workValue.id);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <WorkButtonContainer href={`/${workValue.id}/info`} passHref>
        <WorkButtonImage src={workValue.cover} alt={workValue.title} />
        <TitleAndDateAndKebab>
          <TitleAndDate>
            <WorkButtonTitle>
              <input
                type="text"
                ref={inputRef}
                placeholder="작품의 제목을 적어주세요."
                defaultValue={workValue.title}
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
              {new Date(workValue.updatedAt).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </WorkButtonDate>
          </TitleAndDate>
          <Kebab workValue={workValue} inputRef={inputRef} />
        </TitleAndDateAndKebab>
      </WorkButtonContainer>
    </>
  );
}
