"use client";
import { PlotContext, useMainPlot } from "@/hooks/workspace/plot/usePlot";
import {
  Container,
  SubTitle,
  SubTitleWithButton,
  TextNavigationButton,
} from "@/styles/workspace/Info.style";
import { useContext } from "react";
import { WorkspaceLayoutContext } from "@/hooks/workspace/useWorkspaceLayout";
import { LoadingMessage } from "@/styles/dashboard/Loading.style";
import { Help } from "@/components/Help";

export default function ScriptSidebar() {
  const plotValue = useMainPlot();
  return (
    <PlotContext.Provider value={plotValue}>
      <Container>
        <SubTitleWithButton>
          <SubTitle>
            원고 작성 <Help messageKey="WRITE_MANUSCRIPT" />
          </SubTitle>
          <OpenSideBar />
        </SubTitleWithButton>
        <SubTitleWithButton>
          <LoadingMessage>
            지금까지 작성한 기획을 바탕으로 작품을 집필해보세요.
          </LoadingMessage>
        </SubTitleWithButton>
      </Container>
    </PlotContext.Provider>
  );
}

export function OpenSideBar() {
  const { toggleScript } = useContext(WorkspaceLayoutContext);

  return (
    <TextNavigationButton onClick={toggleScript}>
      원고 관리하러 가기
    </TextNavigationButton>
  );
}
