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
import { WarningModal } from "@/components/WarningModal";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { copy } from "@/utils/copy";
import { useCallback, useRef } from "react";

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
  } = useChapter(chapterId ?? "", isFolded);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = useCallback(() => {
    if (descRef.current) {
      copy(descRef.current.value)();
    }
  }, []);

  const { isOpenDeleteModal, onOpenModal, closeModal } = useWarningModal();
  return (
    <ChapterContainer id={"c" + chapterId}>
      <ChapterDragWrap>
        <DragDrop />
      </ChapterDragWrap>

      <ChapterCard>
        <ChapterHeader>
          <TitleInput
            defaultValue={chapterName}
            onChange={onChapterNameChange}
            placeholder={
              chapterId ? "챕터 제목을 입력해주세요." : "챕터 생성 중"
            }
            disabled={!chapterId}
          />
          <IconButton
            type="button"
            onClick={chapterId ? toggleChapterFold : undefined}
          >
            {isFolded && <ToggleFold />}
            {!isFolded && <ToggleIcon />}
          </IconButton>
          <IconButton
            type="button"
            onClick={chapterId ? handleCopy : undefined}
          >
            <CopyIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={chapterId ? onOpenModal : undefined}
          >
            <DeleteIcon />
          </IconButton>
          {isOpenDeleteModal && (
            <WarningModal
              closeModal={closeModal}
              onClickConfirm={onChapterDeleteClick}
              onClickCancel={closeModal}
              messageKey="chapterDelete"
            />
          )}
        </ChapterHeader>
        <Description
          defaultValue={chapterDescription}
          onChange={onChapterDescriptionChange}
          placeholder={chapterId ? "챕터 내용을 적어주세요." : ""}
          disabled={!chapterId}
          ref={descRef}
        />
        {!isFolded && <EventList pevent={pevent} chapterId={chapterId ?? ""} />}
      </ChapterCard>
    </ChapterContainer>
  );
}
