"use client";
import { PlotContext, useMainPlot } from "@/hooks/workspace/plot/usePlot";
import {
  Container,
  SubTitle,
  AddMemoButtonContainer,
  SubTitleWithButton,
} from "@/styles/workspace/Info.style";
import ChapterList from "../plot/ChapterList";
import { useContext } from "react";
import { WorkspaceLayoutContext } from "@/hooks/workspace/useWorkspaceLayout";

export default function ScriptSidebar() {
  const plotValue = useMainPlot();
  return (
    <PlotContext.Provider value={plotValue}>
      <Container>
        <SubTitleWithButton>
          <SubTitle>메인 플롯</SubTitle>
          <OpenSideBar />
        </SubTitleWithButton>
        <ChapterList />
      </Container>
    </PlotContext.Provider>
  );
}

export function OpenSideBar() {
  const { togglePlot } = useContext(WorkspaceLayoutContext);

  return (
    <AddMemoButtonContainer onClick={togglePlot}>
      플롯 관리하러 가기
    </AddMemoButtonContainer>
  );
}
