import { colorSystem } from "@/styles/colorSystem";
import { ChapterContainer } from "@/styles/workspace/plot/Chapter.styles";
import { TPlotEvent } from "@/utils/APIs/types";
import styled from "styled-components";
import { EventList } from "./EventList";
import { TbTriangleInverted } from "react-icons/tb";
import { MdContentCopy } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteChapter } from "@/utils/APIs/plot";

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
      <div style={{ marginLeft: "40px", marginTop: "16px" }}>
        <div style={{ marginRight: "20px" }}>
          <TitleInput
            value={chapterName}
            placeholder="챕터 제목을 적어주세요."
          />
          <IconButton
            type="button"
            onClick={() => setIsOpenAlone(!isOpenAlone)}
          >
            {isOpenAlone && <TbTriangleInverted />}
            {!isOpenAlone && (
              <TbTriangleInverted style={{ transform: "rotate(-90deg)" }} />
            )}
          </IconButton>
          <IconButton type="button">
            <MdContentCopy />
          </IconButton>
          <IconButton type="button">
            <FiTrash2 />
          </IconButton>
        </div>
        <ContentTextArea
          value={chapterDescription}
          placeholder="챕터 내용을 적어주세요."
        />
        {isOpenAlone && (
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              margin: "20px 0px",
            }}
          >
            <EventList pevent={pevent} />
            <AddButton>
              <FaPlus color="white" />
            </AddButton>
          </div>
        )}
      </div>
    </ChapterContainer>
  );
}

export const IconButton = styled.button`
  width: 32px;
  font-size: 18px;
  background: transparent;
  border: none;
  color: ${colorSystem.gray300};
  cursor: pointer;
`;

const AddButton = styled.button`
  cursor: pointer;
  padding: 4.46538px;
  width: 23.82px;
  height: 23.82px;
  border: none;
  margin-top: 8px;

  background: ${colorSystem.orange400};
  box-shadow: 0px 0.992308px 2.97692px rgba(0, 0, 0, 0.1),
    0px 0.992308px 1.98462px -0.992308px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

const TitleInput = styled.input`
  height: 36px;
  text-overflow: clip;
  width: 85%;
  border: none;

  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  display: inline-block;

  margin-bottom: 8px;

  color: ${colorSystem.gray900};
`;

const ContentTextArea = styled.textarea`
  border: none;
  height: 24px;
  resize: none;
  width: 95%;

  font-weight: 600;
  font-size: 16px;
  line-height: 150%;

  display: flex;
  align-items: center;

  color: ${colorSystem.gray900};
`;
