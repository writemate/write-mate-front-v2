import {
  AddButton,
  ChapterContainer,
  ChapterMargin,
  ContentTextArea,
  IconButton,
  OpenContainer,
  TitleInput,
} from "@/styles/workspace/plot/Chapter.styles";
import { TPlotEvent } from "@/utils/APIs/types";
import { EventList } from "./EventList";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteChapter } from "@/utils/APIs/plot";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import ToggleIcon from "@/assets/workspace/plot/toggle.svg";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import Add from "@/assets/workspace/plot/add.svg";
import ToggleFold from "@/assets/workspace/plot/toggleFold.svg";

interface ChapterProps {
  chapterName: string;
  chapterDescription: string;
  pevent: TPlotEvent[];
  isOpen: boolean;
}

export default function Chapter({
  chapterName,
  chapterDescription,
  pevent,
  isOpen,
}: ChapterProps) {
  /**
   * todo: input 늘어나면 줄바꿈
   *
   */
  const [isOpenAlone, setIsOpenAlone] = useState(isOpen);

  useEffect(() => {
    setIsOpenAlone(isOpen);
  }, [isOpen]);

  // 챕터 삭제
  /* const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteChapter,
  });*/

  return (
    <ChapterContainer isOpenAlone={isOpenAlone}>
      <ChapterMargin>
        <div>
          <TitleInput
            value={chapterName}
            placeholder="챕터 제목을 적어주세요."
          />
          <IconButton
            type="button"
            onClick={() => setIsOpenAlone(!isOpenAlone)}
          >
            {isOpenAlone && <ToggleIcon style={{ marginBottom: "10%" }} />}
            {!isOpenAlone && <ToggleFold style={{ marginBottom: "11%" }} />}
          </IconButton>
          <IconButton type="button">
            <CopyIcon />
          </IconButton>
          <IconButton type="button">
            <DeleteIcon />
          </IconButton>
        </div>
        <ContentTextArea
          value={chapterDescription}
          placeholder="챕터 내용을 적어주세요."
        />
        {isOpenAlone && (
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
