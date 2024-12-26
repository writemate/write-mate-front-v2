import { FlexRowLeftStart } from "@/styles";
import styled from "styled-components";

export const CharacterCardTitle = styled.div`
  ${FlexRowLeftStart};
  width: 100%;
  & > *:last-child {
    margin-left: auto;
    flex-shrink: 0;
  }
`;
export const CharacterImage = styled.div<{ $src: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.color.gray200};
  box-shadow: 2px 2px 8px #323f4d33;
  border: 2px solid #fff;
  flex-shrink: 0;
  margin-right: 12px;
  font-size: 18px;
  font-weight: 700;
`;

export const NameAndRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc(100% - 60px);
`;

export const CharacterName = styled.div`
  font-size: 14px;
  font-weight: 700;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CharacterRole = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
export const CharacterDescription = styled.div`
  font-size: 14px;
  line-height: 21px;
  height: 42px;
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
