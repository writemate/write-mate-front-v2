import Link from "next/link";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
`;

export const PopupContainer = styled.div`
  width: 653px;
  max-width: calc(100vw - 20px);
  height: fit-content;
  max-height: calc(100vh - 20px);
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

export const PopupContent = styled.div`
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  gap: 14px;
  background: white;
  border: 8px solid ${({ theme }) => theme.color.orange75};
  font-family: Pretendard;
  overflow: auto;
`;

export const Title = styled.div<{ $isNoti: boolean }>`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.5;
  color: ${({ $isNoti, theme }) =>
    $isNoti ? ({ theme }) => theme.color.red400 : theme.color.orange400};
  margin-bottom: 10px;
`;

export const Description = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Highlight = styled.span<{ $isNoti: boolean }>`
  color: ${({ $isNoti, theme }) =>
    $isNoti ? ({ theme }) => theme.color.red400 : theme.color.orange400};
`;

export const Note = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

export const StyledLink = styled(Link)<{ $isNoti: boolean }>`
  padding: 5px 20px;
  border-radius: 100px;
  background-color: ${({ $isNoti, theme }) =>
    $isNoti ? ({ theme }) => theme.color.red400 : theme.color.orange400};
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: 800;
  font-size: 16px;
  line-height: 1.5;
  user-select: none;
  margin-left: auto;
  font-family: Pretendard;
  text-decoration: none;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
  background: transparent;
  flex-shrink: 0;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  color: white;
`;
