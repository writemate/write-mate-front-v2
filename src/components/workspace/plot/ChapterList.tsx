"use client";

import Chapter from "./Chapter";
import { PlotChapterType } from "@/utils/APIs/mock/plot";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import ToggleBtn from "./ToggleBtn";
import { AddChapterButton } from "@/styles/workspace/plot/ChapterList.styles";
import useChapterList from "@/hooks/workspace/plot/useChapterList";
import { useParams } from "next/navigation";


export default function ChapterList() {
  const { plotId } = useParams<{ plotId: string }>();
  const { mutateCreate, mutateDelete, mutateChapterOrder, mutateChapterFold } =
    useChapterList();

  const {
    items: chapterList,
    setItems: setChapterList,
    handleDragAndDrop,
  } = useDragAndDrop<PlotChapterType>({
    mutationOrderFn: async ({ itemId, pre_idx, next_idx }) =>
      mutateChapterOrder({ chapterId: itemId, pre_idx, next_idx }),
  });

  const areAllChaptersFolded = chapterList.every(
    (chapter) => chapter.is_folded
  );

  const toggleAllChapters = () => {
    const newFoldedState = !areAllChaptersFolded;
    setChapterList((prevChapters) =>
      prevChapters.map((chapter) => ({
        ...chapter,
        is_folded: newFoldedState,
      }))
    );
  };

  const handleLocalFold = (id: string, isFolded: boolean) => {
    setChapterList((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === id ? { ...chapter, is_folded: isFolded } : chapter
      )
    );
    mutateChapterFold({ chapterId: id, is_folded: isFolded });
  };

  // 버튼 클릭 시 챕터 추가
  const handleAddChatper = () => {
    // mock
    const mockChapter: PlotChapterType = {
      id: Date.now().toString(), // 임시 id 설정
      autor: "",
      work_id: "",
      chapter_name: ``,
      chapter_description: "",
      order: chapterList.length,
      is_starred: false,
      pevent_list: [],
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      is_folded: false,
    };
    setChapterList((prevChapters) => [...prevChapters, mockChapter]);

    mutateCreate();
  };

  const handleDeleteChapter = (chapterId: string) => {
    setChapterList((prevChapters) =>
      prevChapters.filter((chapter) => chapter.id !== chapterId)
    );
    mutateDelete(chapterId);
  };

  return (
    <>
      <ToggleBtn
        isOpen={areAllChaptersFolded}
        handleChange={toggleAllChapters}
      />

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="chapterList">
          {(provided) => (
            <div
              style={{ width: "100%" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {chapterList.map((chapter, index) =>
                chapter ? (
                  <Draggable
                    key={chapter.id}
                    draggableId={chapter.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Chapter
                          plotId={plotId}
                          chapterId={chapter.id}
                          chapterName={chapter.chapter_name}
                          chapterDescription={chapter.chapter_description}
                          pevent={chapter.pevent_list}
                          isFolded={chapter.is_folded}
                          onLocalFold={handleLocalFold}
                          onDelete={handleDeleteChapter}
                        />
                      </div>
                    )}
                  </Draggable>
                ) : null
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddChapterButton onClick={handleAddChatper}>
        챕터 추가하기
      </AddChapterButton>
    </>
  );
}
