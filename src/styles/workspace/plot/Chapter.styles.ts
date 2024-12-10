import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { FlexColumnCenter, FlexRowCenter, FlexRowLeftStart } from "@/styles";

export const ChapterContainer = styled.section`
  ${FlexRowLeftStart};
  width: 100%;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.color.orange400};
  margin-bottom: 18.18px;
  padding: 20px 20px 20px 0;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

export const ChapterDragWrap = styled.div`
  ${FlexRowCenter};
  padding: 10px;
  height: 100%;
  width: 40px;
  flex-shrink: 0;
`;

export const ChapterCard = styled.div`
  ${FlexColumnCenter};
  width: 100%;
`;

export const IconButton = styled.button`
  flex: 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
`;

export const ChapterHeader = styled.div`
  ${FlexRowLeftStart}
  width: 100%;
  padding-bottom: 8px;
`;

export const TitleInput = styled.input`
  height: 36px;
  text-overflow: clip;
  width: 100%;
  flex-shrink: 1;
  border: none;
  outline: none;

  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  display: inline-block;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Description = styled(TextareaAutosize)`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: ${({ theme }) => theme.color.gray900};
  border: none;
  outline: none;
  resize: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.gray300};
  }
`;
