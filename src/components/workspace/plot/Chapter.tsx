import {
  AddButton,
  ChapterContainer,
  ChapterMargin,
  IconButton,
  OpenContainer,
  TitleInput,
} from "@/styles/workspace/plot/Chapter.styles";
import { EventList } from "./EventList";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteChapter } from "@/utils/APIs/plot";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import Add from "@/assets/workspace/plot/add.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";
import { PlotEventType } from "@/utils/APIs/mock/plot";
import AutoResizeInput from "./AutoResizeInput";

interface ChapterProps {
  chapterId: string;
  chapterName: string;
  chapterDescription: string;
  pevent: PlotEventType[];
  isFolded: boolean;
  onLocalFold: (id: string, isFolded: boolean) => void;
}

export default function Chapter({
  chapterId,
  chapterName,
  chapterDescription,
  pevent,
  isFolded,
  onLocalFold,
}: ChapterProps) {
  const [content, setContent] = useState<string>(chapterDescription);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const [localIsFolded, setLocalIsFolded] = useState(isFolded);

  useEffect(() => {
    setLocalIsFolded(isFolded);
  }, [isFolded]);

  const toggleChapter = () => {
    const newFoldedState = !localIsFolded;
    setLocalIsFolded(newFoldedState);
    onLocalFold(chapterId, newFoldedState);
  };

  // 챕터 삭제
  /* const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteChapter,
  });*/

  return (
    <ChapterContainer isOpenAlone={localIsFolded}>
      <ChapterMargin>
        <div>
          <TitleInput
            value={chapterName}
            placeholder="챕터 제목을 적어주세요."
          />
          <IconButton type="button" onClick={toggleChapter}>
            {localIsFolded && <ToggleIcon style={{ marginBottom: "10%" }} />}
            {!localIsFolded && <ToggleFold style={{ marginBottom: "11%" }} />}
          </IconButton>
          <IconButton type="button">
            <CopyIcon />
          </IconButton>
          <IconButton type="button">
            <DeleteIcon />
          </IconButton>
        </div>
        <AutoResizeInput
          value={content}
          onChange={handleContentChange}
          placeholder="챕터 내용을 적어주세요."
        />
        {localIsFolded && (
          <OpenContainer>
            <EventList pevent={pevent} />
            <AddButton>
              <Add />
            </AddButton>
          </OpenContainer>
        )}
      </ChapterMargin>
    </ChapterContainer>
  );
}
