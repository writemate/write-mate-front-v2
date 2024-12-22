"use client";
import { DashboardContext } from "@/hooks/dashboard/work/dashboard";
import { Title, NavigationBar, NavigationButton, TitleAndNavigationBar } from "@/styles/dashboard/TitleAndNavigationBar";
import { workspaceCategory } from "@/utils/APIs/types";
import { ideaBoxCategory } from "@/utils/APIs/types";
import { useContext } from "react";

export function WorkStudioTitleAndNavigationBar() {
  const { workCategory, handleWorkCategoryChange } = useContext(DashboardContext).workstudioAndTrash;

  return (
    <TitleAndNavigationBar>
      <Title>대시보드</Title>

      <NavigationBar>
        <NavigationButton
          onClick={() => {
            handleWorkCategoryChange(workspaceCategory.ongoing);
          }}
          $isActivated={workCategory === workspaceCategory.ongoing}
        >
          집필 중
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            handleWorkCategoryChange(workspaceCategory.completed);
          }}
          $isActivated={workCategory === workspaceCategory.completed}
        >
          완결
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}

export function IdeaBoxTitleAndNavigationBar() {
  const { ideaCategory, handleIdeaCategoryChange } = useContext(DashboardContext).ideaBoxMemo;

  return (
    <TitleAndNavigationBar>
      <Title>아이디어 보관함</Title>
      <NavigationBar>
        <NavigationButton
          onClick={() => {
            handleIdeaCategoryChange(ideaBoxCategory.memo);
          }}
          $isActivated={ideaCategory === ideaBoxCategory.memo}
        >
          메모
        </NavigationButton>
        <NavigationButton
          onClick={() => {
            handleIdeaCategoryChange(ideaBoxCategory.character);
          }}
          $isActivated={ideaCategory === ideaBoxCategory.character}
        >
          인물
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}

export function TrashTitleAndNavigationBar() {
  const { workCategory, handleWorkCategoryChange } = useContext(DashboardContext).workstudioAndTrash;

  return (
    <TitleAndNavigationBar>
      <Title>휴지통</Title>
      <NavigationBar>
        <NavigationButton
          onClick={() => {
            handleWorkCategoryChange(workspaceCategory.trash);
          }}
          $isActivated={workCategory === workspaceCategory.trash}
        >
          작품
        </NavigationButton>
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}
