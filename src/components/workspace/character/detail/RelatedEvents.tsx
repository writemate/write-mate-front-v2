"use client";
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import {
  EventColumnContainer,
  EventTitle,
  EventListContainer,
  EventTitleDiv,
} from "@/styles/workspace/plot/Event.styles";
import { useContext, useState } from "react";
import {
  ChapterCard,
  IconButton,
  ChapterHeader,
  TitleDiv,
} from "@/styles/workspace/plot/Chapter.styles";
import {
  ChapterContainer,
  EventContainer,
} from "@/styles/workspace/Character.style";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";
import { TChapter } from "@/utils/APIs/types";
import { CharacterContext } from "@/hooks/workspace/character/character";
import { useParams } from "next/navigation";

function Chapter({
  id: chapterId,
  chapter_name: chapterName,
  pevent_list: pevent,
  plotId: plotId,
}: TChapter & { plotId: string }) {
  const [isFolded, setIsFolded] = useState(false);
  const { workspace_id } = useParams<{ workspace_id: string }>();
  const toggleChapterFold = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFolded(!isFolded);
  };

  return (
    <ChapterContainer
      $isDraggable={false}
      href={`/${workspace_id}/plot/${plotId}#c${chapterId}`}
    >
      <ChapterCard>
        <ChapterHeader>
          <TitleDiv>{chapterName}</TitleDiv>
          <IconButton type="button" onClick={toggleChapterFold}>
            {isFolded && <ToggleFold />}
            {!isFolded && <ToggleIcon />}
          </IconButton>
        </ChapterHeader>
        {!isFolded && (
          <EventListContainer>
            {pevent.map((event) => (
              <EventContainer
                key={event.id}
                $isDraggable={false}
                href={`/${workspace_id}/plot/${plotId}#e${event.id}`}
              >
                <EventColumnContainer key={event.id}>
                  <EventTitleDiv>{event.event_name}</EventTitleDiv>
                </EventColumnContainer>
              </EventContainer>
            ))}
          </EventListContainer>
        )}
      </ChapterCard>
    </ChapterContainer>
  );
}

export default function RelatedEvents() {
  const { data, isLoading } = useContext(CharacterContext);
  const { relatedEvent } = data ?? {};
  return (
    <Container>
      <SubTitle>연관 사건</SubTitle>
      {relatedEvent?.length === 0 && <span>연관 사건이 없습니다.</span>}
      {relatedEvent?.map((event) => <Chapter key={event.id} {...event} />)}
    </Container>
  );
}
