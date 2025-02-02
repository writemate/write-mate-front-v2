"use client";
import {
  Container,
  SubTitle,
  SubTitleWithButton,
  TextNavigationButton,
} from "@/styles/workspace/Info.style";
import ChapterList from "../plot/ChapterList";
import { useContext } from "react";
import { WorkspaceLayoutContext } from "@/hooks/workspace/useWorkspaceLayout";
import { Help } from "@/components/Help";
import { InfoContext } from "@/hooks/workspace/info";
import { Chapter } from "../character/detail/RelatedEvents";

export default function ScriptSidebar() {
  const { data } = useContext(InfoContext);
  const { mainPlot } = data ?? {};
  return (
    <Container>
      <SubTitleWithButton>
        <SubTitle>
          메인 플롯 <Help messageKey="MAIN_PLOT" />
        </SubTitle>
        <OpenSideBar />
      </SubTitleWithButton>
      {mainPlot?.chapter_list?.map((event) => (
        <Chapter key={event.id} {...event} plotId={mainPlot.id} />
      ))}
    </Container>
  );
}

export function OpenSideBar() {
  const { togglePlot } = useContext(WorkspaceLayoutContext);

  return (
    <TextNavigationButton onClick={togglePlot}>
      플롯 관리하러 가기
    </TextNavigationButton>
  );
}
