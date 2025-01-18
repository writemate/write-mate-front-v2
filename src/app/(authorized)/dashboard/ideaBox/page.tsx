"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList.style";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import MemoList from "@/components/dashboard/Memo/MemoList";
import CharacterList from "@/components/dashboard/Character/CharacterList";
import {
  ideaCategoryContext,
  useIdeaCategory,
} from "@/hooks/dashboard/ideaCategoy";

export default function Dashboard() {
  const ideaCategoryValue = useIdeaCategory();
  const { ideaCategory } = ideaCategoryValue;

  return (
    <TitleAndWorkListContainer>
      <ideaCategoryContext.Provider value={ideaCategoryValue}>
        <IdeaBoxTitleAndNavigationBar />
        {ideaCategory == "memo" && <MemoList />}
        {ideaCategory == "character" && <CharacterList />}
      </ideaCategoryContext.Provider>
    </TitleAndWorkListContainer>
  );
}
