"use client";
import { ideaCategoryContext } from "@/hooks/dashboard/ideaCategoy";
import { MyPageContext } from "@/hooks/dashboard/useMyPage";
import { WorkCategoryContext } from "@/hooks/dashboard/work/workCategory";
import {
  Title,
  NavigationBar,
  TitleAndNavigationBar,
  NavigationButton,
} from "@/styles/dashboard/TitleAndNavigationBar.style";
import { workspaceCategory } from "@/utils/APIs/types";
import { ideaBoxCategory } from "@/utils/APIs/types";
import { useContext } from "react";
import { Help } from "../Help";

export function WorkStudioTitleAndNavigationBar() {
  const { onCategoryOngoingClick, onCategoryCompletedClick, isActiveCategory } =
    useContext(WorkCategoryContext);

  const { user } = useContext(MyPageContext);

  return (
    <TitleAndNavigationBar>
      <Title>
        {user?.user_name} 작가님의 작업실
        <Help messageKey="WORK_STUDIO" />
      </Title>
      <NavigationBar>
        <NavigationButton
          onClick={onCategoryOngoingClick}
          $isActivated={isActiveCategory(workspaceCategory.ongoing)}
        >
          집필 중
        </NavigationButton>
        <NavigationButton
          onClick={onCategoryCompletedClick}
          $isActivated={isActiveCategory(workspaceCategory.completed)}
        >
          완결
        </NavigationButton>
        <Help messageKey="WORK_STUDIO" isRight={true} />
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}

export function IdeaBoxTitleAndNavigationBar() {
  const { onClickMemo, onClickCharacter, isActiveCategory } =
    useContext(ideaCategoryContext);
  const { user } = useContext(MyPageContext);

  return (
    <TitleAndNavigationBar>
      <Title>
        {user?.user_name} 작가님의 아이디어 <Help messageKey="IDEA_BOX" />
      </Title>
      <NavigationBar>
        <NavigationButton
          onClick={onClickMemo}
          $isActivated={isActiveCategory(ideaBoxCategory.memo)}
        >
          메모
        </NavigationButton>
        <NavigationButton
          onClick={onClickCharacter}
          $isActivated={isActiveCategory(ideaBoxCategory.character)}
        >
          인물
        </NavigationButton>
        <Help messageKey="IDEA_BOX" isRight={true} />
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}

export function TrashTitleAndNavigationBar() {
  const { onCategoryTrashClick, isActiveCategory } =
    useContext(WorkCategoryContext);
  const { user } = useContext(MyPageContext);

  return (
    <TitleAndNavigationBar>
      <Title>
        휴지통
        <Help messageKey="TRASH" />
      </Title>
      <NavigationBar>
        <NavigationButton
          onClick={onCategoryTrashClick}
          $isActivated={isActiveCategory(workspaceCategory.trash)}
        >
          작품
        </NavigationButton>
        <Help messageKey="TRASH" isRight={true} />
      </NavigationBar>
    </TitleAndNavigationBar>
  );
}
