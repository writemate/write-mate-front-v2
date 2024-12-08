"use client";
import Chapter from "./Chapter";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ToggleBtn from "./ToggleBtn";
import { AddChapterButton } from "@/styles/workspace/plot/ChapterList.styles";
import useChapterList from "@/hooks/workspace/plot/useChapterList";


export default function ChapterList() {
  const { chapterList, handleDragAndDrop, areAllChaptersFolded, toggleAllChapters,
    mutateCreate, mutateDelete, mutateChapterOrder, mutateChapterFold } =
    useChapterList();

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
                          chapterId={chapter.id}
                          chapterName={chapter.chapter_name}
                          chapterDescription={chapter.chapter_description}
                          pevent={chapter.pevent_list}
                          isFolded={chapter.is_folded}
                        />
                      </div>
                    )}
                  </Draggable>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddChapterButton onClick={()=>mutateCreate()}>
        챕터 추가하기
      </AddChapterButton>
    </>
  );
}
