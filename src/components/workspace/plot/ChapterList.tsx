"use client";

import Chapter from "./Chapter";
import { PlotChapterType } from "@/utils/APIs/mock/plot";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useDragAndDrop from "@/hooks/workspace/plot/useDragAndDrop";
import { useEffect, useState } from "react";
import ToggleBtn from "./ToggleBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChapter } from "@/utils/APIs/plot";
import { AddChapterButton } from "@/styles/workspace/plot/ChapterList.styles";

interface plotPageProps {
  chapters: PlotChapterType[];
  plotId: string;
}

export default function ChapterList({ chapters, plotId }: plotPageProps) {
  const { items: chapter, handleDragAndDrop } =
    useDragAndDrop<PlotChapterType>(chapters);

  const [chapterList, setChapterList] = useState<PlotChapterType[]>(
    chapter.map((chapter) => ({ ...chapter }))
  );

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
  };

  useEffect(() => {}, [chapter]);

  const queryClient = useQueryClient();

  // 챕터 추가 - 되는지모르겟노 그냥 뇌가 멈춤 ㅋ
  const { mutate: mutateCreate } = useMutation<PlotChapterType, Error, number>({
    mutationFn: (order: number) => createChapter(plotId, order),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["chapters", plotId] });

      const previousChapters = queryClient.getQueryData<PlotChapterType[]>([
        "chapters",
        plotId,
      ]);

      // UI 상에서 즉시 새로운 챕터 추가 (낙관적 업데이트)
      const optimisticChapter: PlotChapterType = {
        id: Date.now().toString(), // 임시 id 설정
        autor: "",
        work_id: "",
        chapter_name: ``,
        chapter_description: "",
        order: chapter.length,
        is_starred: false,
        pevent_list: [],
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        is_folded: true,
      };

      setChapterList((prevChapters) => [...prevChapters, optimisticChapter]);

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
    const optimisticChapter: PlotChapterType = {
      id: Date.now().toString(), // 임시 id 설정
      autor: "",
      work_id: "",
      chapter_name: ``,
      chapter_description: "",
      order: chapter.length,
      is_starred: false,
      pevent_list: [],
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      is_folded: true,
    };
    setChapterList((prevChapters) => [...prevChapters, optimisticChapter]);
    console.log(chapter);

    //mutateCreate(chapter.length);
  };

  // 챕터 수정

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
                          chapterId={chapter.id}
                          chapterName={chapter.chapter_name}
                          chapterDescription={chapter.chapter_description}
                          pevent={chapter.pevent_list}
                          isFolded={chapter.is_folded}
                          onLocalFold={handleLocalFold}
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
