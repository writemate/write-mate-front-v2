import { colorSystem } from "@/styles/colorSystem";
import { media } from "@/styles/media";
import styled from "styled-components";

export const AddChapterButton = styled.button`
  background: transparent;
  color: ${colorSystem.orange400};
  weight: 80px;
  border: none;
  fontsize: 14px;
  fontweight: 350;
  cursor: pointer;
  margin-top: 22px;
  margin-bottom: 22px;

  ${media.tablet} {
    margin-bottom: 12px;
  }
`;

export const ChapterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
