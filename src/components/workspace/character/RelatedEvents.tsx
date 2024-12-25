'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { EventColumnContainer, EventHeader, EventTitle, EventDescription, CharacterImg, EventDeleteBtn, EventContainer, EventListContainer } from "@/styles/workspace/plot/Event.styles";
import { useContext, useState } from 'react';
import { InfoContext } from "@/hooks/workspace/info";
import {
    ChapterContainer,
    ChapterDragWrap,
    ChapterCard,
    IconButton,
    TitleInput,
    Description,
    ChapterHeader,
} from "@/styles/workspace/plot/Chapter.styles";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import DragDrop from "@/assets/workspace/plot/dragdrop.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";
import useChapter from "@/hooks/workspace/plot/useChapter";
import { TChapter } from "@/utils/APIs/types";
import { CharacterContext } from "@/hooks/workspace/character/character";
  
function Chapter({
    id: chapterId,
    chapter_name: chapterName,
    chapter_description: chapterDescription,
    pevent_list: pevent,
  }: TChapter) {

    const [isFolded, setIsFolded] = useState(true);
    const toggleChapterFold = () => setIsFolded(!isFolded);
  
    return (
      <ChapterContainer isDraggable={false}>
        <ChapterCard>
          <ChapterHeader>
            <TitleInput
              value={chapterName}
              disabled
            />
            <IconButton type="button" onClick={toggleChapterFold}>
              {isFolded && <ToggleFold/>}
              {!isFolded && <ToggleIcon/>}
            </IconButton>
          </ChapterHeader>
          <Description
            value={chapterDescription}
            disabled
          />
          {!isFolded && <EventListContainer>
            {pevent.map((event) => (
                <EventContainer key={event.id} isDraggable={false}>
                    <EventColumnContainer key={event.id}>
                        <EventHeader>
                            {event.character_list.map((character) => (
                                <CharacterImg
                                    key={character.id}
                                    $src={character.ch_image}
                                />
                            ))}
                        </EventHeader>
                        <EventTitle value={event.event_name} disabled/>
                        <EventDescription  value={event.event_description} disabled/>
                    </EventColumnContainer>
                </EventContainer>
            ))}
          </EventListContainer>}
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
            {relatedEvent?.map((event) => (
                <Chapter key={event.id} {...event} />
            ))}
        </Container>
    );
}
