import {
  ChapterContainer,
  ChapterDragWrap,
  ChapterMargin,
  IconButton,
  OpenContainer,
  TitleInput,
} from "@/styles/workspace/plot/Chapter.styles";
import { EventList } from "./EventList";
import { useEffect, useState } from "react";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import DragDrop from "@/assets/workspace/plot/dragdrop.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";
import { PlotEventType } from "@/utils/APIs/mock/plot";
import AutoResizeInput from "./AutoResizeInput";
import useChapterList from "@/hooks/workspace/plot/useChapterList";
import { TPlotEvent } from "@/utils/APIs/types";

interface ChapterProps {
  chapterId: string;
  chapterName: string;
  chapterDescription: string;
  pevent: TPlotEvent[];
  isFolded: boolean;
}

export default function Chapter({
  chapterId,
  chapterName,
  chapterDescription,
  pevent,
  isFolded,
}: ChapterProps) {
  const [title, setTitle] = useState<string>(chapterName);
  const [content, setContent] = useState<string>(chapterDescription);
  const { mutateChapterName, mutateChapterDescription } = useChapterList();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
    mutateChapterName({ chapterId, chapter_name: value });
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    mutateChapterDescription({ chapterId, chapter_description: value });
  };

  const [localIsFolded, setLocalIsFolded] = useState(isFolded);

  useEffect(() => {
    setLocalIsFolded(isFolded);
  }, [isFolded]);

  const toggleChapter = () => {
    const newFoldedState = !localIsFolded;
    setLocalIsFolded(newFoldedState);
  };

  return (
    <ChapterContainer isOpenAlone={localIsFolded}>
      <ChapterDragWrap>
        <DragDrop />
      </ChapterDragWrap>

      <ChapterMargin>
        <div>
          <TitleInput
            value={title}
            onChange={handleNameChange}
            placeholder="챕터 제목을 적어주세요."
          />
          <IconButton type="button" onClick={toggleChapter}>
            {localIsFolded && <ToggleIcon style={{ marginBottom: "10%" }} />}
            {!localIsFolded && <ToggleFold style={{ marginBottom: "11%" }} />}
          </IconButton>
          <IconButton type="button">
            <CopyIcon />
          </IconButton>
          <IconButton type="button" onClick={()=>{}}>
            <DeleteIcon />
          </IconButton>
        </div>
        <AutoResizeInput
          isFolded={localIsFolded}
          value={content}
          onChange={handleContentChange}
          placeholder="챕터 내용을 적어주세요."
        />
        {localIsFolded && (
          <OpenContainer>
            {/* <EventList pevent={pevent} /> */}
          </OpenContainer>
        )}
      </ChapterMargin>
    </ChapterContainer>
  );
}
