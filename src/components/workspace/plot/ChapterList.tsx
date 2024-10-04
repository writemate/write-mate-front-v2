"use client";

import Chapter from "./Chapter";
import { ChapterType } from "@/utils/APIs/mock/plot";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { colorSystem } from "@/styles/colorSystem";
import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { useState } from "react";
import ToggleBtn from "./ToggleBtn";

interface plotPageProps {
  chapters: ChapterType[];
  isOpenAll: boolean;
}

export default function ChapterList({ chapters, isOpenAll }: plotPageProps) {
  const { items: chapterList, handleDragAndDrop } =
    useDragAndDrop<ChapterType>(chapters);

  const [isOpen, setIsOpen] = useState<boolean>(isOpenAll);

  return (
    <>
      <ToggleBtn isOpen={isOpen} handleChange={() => setIsOpen(!isOpen)} />

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Droppable droppableId="chapterList">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapterList.map((chapter, index) =>
                chapter ? (
                  <Draggable
                    key={chapter._id}
                    draggableId={chapter._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Chapter
                          chapterName={chapter.chapter_name}
                          chapterDescription={chapter.chapter_description}
                          pevent={chapter.pevent}
                          isOpen={isOpen}
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
      <button
        style={{
          background: "transparent",
          color: `${colorSystem.orange400}`,
          width: "80px",
          border: "none",
          fontSize: "14px",
          fontWeight: "350",
          cursor: "pointer",
          marginTop: "22px",
          marginBottom: "168px",
        }}
      >
        챕터 추가하기
      </button>
    </>
  );
}

const addChapterButton = styled.button`
  background: transparent;
  color: ${colorSystem.orange400};
  weight: 80px;
`;
