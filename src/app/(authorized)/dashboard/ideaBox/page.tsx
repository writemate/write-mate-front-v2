"use client";
import { TitleAndWorkListContainer } from "@/styles/dashboard/Work/WorkList";
import { IdeaBoxTitleAndNavigationBar } from "@/components/dashboard/TitleAndNavigationBar";
import MemoList from "@/components/dashboard/Memo/MemoList";
import CharacterList from "@/components/dashboard/MCharacter/MCharacterList";
import { useIdeaCategory } from "@/hooks/dashboard/ideaCategoy";

export default function Dashboard() {
  const ideaCategoryValue = useIdeaCategory();
  const { ideaCategory } = ideaCategoryValue;

  return (
    <TitleAndWorkListContainer>
      <IdeaBoxTitleAndNavigationBar />
      {ideaCategory == "memo" && <MemoList />}
      {ideaCategory == "character" && <CharacterList />}
    </TitleAndWorkListContainer>
  );
}
