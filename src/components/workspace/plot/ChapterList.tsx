"use client";
import Chapter from "./Chapter";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ToggleBtn from "./ToggleBtn";
import {
  AddChapterButton,
  ChapterListContainer,
} from "@/styles/workspace/plot/ChapterList.styles";
import useChapterList from "@/hooks/workspace/plot/useChapterList";
import { useContext } from "react";
import { PlotContext } from "@/hooks/workspace/plot/usePlot";

export default function ChapterList() {
  const { plot_id } = useContext(PlotContext);
  const {
    chapterList,
    handleDragAndDrop,
    areAllChaptersFolded,
    toggleAllChapters,
    onClickCreate,
  } = useChapterList(plot_id);

  return (
    <>
      <ToggleBtn
        isOpen={areAllChaptersFolded}
        handleChange={toggleAllChapters}
      />
      <ChapterListContainer>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <Droppable droppableId="chapterList">
            {(provided) => (
              <div
                style={{ width: "100%" }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {chapterList.map((chapter, index) => (
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
                        <Chapter {...chapter} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <AddChapterButton onClick={onClickCreate}>
          챕터 추가하기
        </AddChapterButton>
      </ChapterListContainer>
    </>
  );
}
