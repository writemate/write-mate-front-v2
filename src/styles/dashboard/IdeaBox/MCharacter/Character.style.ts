import { FlexColumnCenter, FlexRowLeftStart } from "@/styles";
import {
  FontSemibold14,
  FontSemibold16,
  FontTabletRegular13,
} from "@/styles/Font";
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
  ${FontSemibold16}
  ${FlexColumnCenter}
  justify-content: center;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.color.gray200};
  color: ${({ theme }) => theme.color.white};
  box-shadow: 2px 2px 8px #323f4d33;
  border: 2px solid #fff;
  flex-shrink: 0;
  margin-right: 12px;
`;

export const NameAndRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: calc(100% - 60px);
`;

export const CharacterName = styled.div`
  ${FontSemibold14}
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const CharacterRole = styled.div`
  ${FontTabletRegular13}
  color: ${({ theme }) => theme.color.gray400};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
export const CharacterDescription = styled.div`
  ${FontTabletRegular13}
  color: ${({ theme }) => theme.color.gray400};
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
