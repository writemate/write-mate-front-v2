"use client";

import Chapter from "./Chapter";
import { ChapterType } from "@/utils/APIs/mock/plot";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { useEffect, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter } from "@/utils/APIs/plot";
import { TPlot } from "@/utils/APIs/types";
import { AddChapterButton } from "@/styles/workspace/plot/ChapterList.styles";

interface plotPageProps {
  chapters: ChapterType[];
  isOpenAll: boolean;
  plotId: string;
}

export default function ChapterList({
  chapters,
  isOpenAll,
  plotId,
}: plotPageProps) {
  const { items: chapterList, handleDragAndDrop } =
    useDragAndDrop<ChapterType>(chapters);

  const [isOpen, setIsOpen] = useState<boolean>(isOpenAll);

  const [chapter, setChapter] = useState<ChapterType[]>(chapters);

  useEffect(() => {}, [chapter]);

  const queryClient = useQueryClient();

  // 챕터 추가 - 되는지모르겟노 그냥 뇌가 멈춤 ㅋ
  const { mutate: mutateCreate } = useMutation<ChapterType, Error, number>({
    mutationFn: (order: number) => createChapter(plotId, order),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["chapters", plotId] });

      const previousChapters = queryClient.getQueryData<ChapterType[]>([
        "chapters",
        plotId,
      ]);

      // UI 상에서 즉시 새로운 챕터 추가 (낙관적 업데이트)
      const optimisticChapter: ChapterType = {
        _id: Date.now().toString(), // 임시 id 설정
        chapter_name: ``,
        chapter_description: "",
        order: chapter.length,
        pevent: [],
      };

      setChapter((prevChapters) => [...prevChapters, optimisticChapter]);

      return { previousChapters };
    },
    onError: (err, context) => {},
    onSuccess: () => {
      // 성공 시 데이터를 최신 상태로 동기화
      queryClient.invalidateQueries({ queryKey: ["chapters", plotId] });
    },
  });

  // 버튼 클릭 시 챕터 추가
  const handleAddChatper = () => {
    // 일단 모킹인데 UI가 안바뀜 어캐함
    const optimisticChapter: ChapterType = {
      _id: Date.now().toString(), // 임시 id 설정
      chapter_name: ``,
      chapter_description: "",
      order: chapter.length,
      pevent: [],
    };
    setChapter((prevChapters) => [...prevChapters, optimisticChapter]);
    console.log(chapter);

    //mutateCreate(chapter.length);
  };

  // 챕터 수정

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

      <AddChapterButton onClick={handleAddChatper}>
        챕터 추가하기
      </AddChapterButton>
    </>
  );
}

//tq
