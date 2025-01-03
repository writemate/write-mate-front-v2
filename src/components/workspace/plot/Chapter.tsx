import {
  ChapterContainer,
  ChapterDragWrap,
  ChapterCard,
  IconButton,
  Description,
  TitleInput,
  ChapterHeader,
} from "@/styles/workspace/plot/Chapter.styles";
import { EventList } from "./EventList";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import DragDrop from "@/assets/workspace/plot/dragdrop.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";
import useChapter from "@/hooks/workspace/plot/useChapter";
import { TChapter } from "@/utils/APIs/types";

export default function Chapter({
  id: chapterId,
  chapter_name: chapterName,
  chapter_description: chapterDescription,
  pevent_list: pevent,
  is_folded: isFolded,
}: TChapter) {
  const {
    onChapterDeleteClick,
    onChapterNameChange,
    onChapterDescriptionChange,
    toggleChapterFold,
  } = useChapter(chapterId, isFolded);

  return (
    <ChapterContainer>
      <ChapterDragWrap>
        <DragDrop />
      </ChapterDragWrap>

      <ChapterCard>
        <ChapterHeader>
          <TitleInput
            defaultValue={chapterName}
            onChange={onChapterNameChange}
            placeholder="챕터 제목을 적어주세요."
          />
          <IconButton type="button" onClick={toggleChapterFold}>
            {isFolded && <ToggleFold />}
            {!isFolded && <ToggleIcon />}
          </IconButton>
          <IconButton type="button">
            <CopyIcon />
          </IconButton>
          <IconButton type="button" onClick={onChapterDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </ChapterHeader>
        <Description
          defaultValue={chapterDescription}
          onChange={onChapterDescriptionChange}
          placeholder="챕터 내용을 적어주세요."
        />
        {!isFolded && <EventList pevent={pevent} chapterId={chapterId} />}
      </ChapterCard>
    </ChapterContainer>
  );
}
