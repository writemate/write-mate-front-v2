import { styled, css, keyframes } from "styled-components";
import { media } from "./media";

export const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexRowLeftStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FlexColumnLeftStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FlexColumnStretchCenter = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

export const MainColorBackground = css`
  background-color: ${({ theme }) => theme.color.red400};
  color: white;
  border: 1px solid ${({ theme }) => theme.color.red400};
  border-radius: 5px;
`;

export const ReverseMainColorBackground = css`
  background-color: white;
  color: ${({ theme }) => theme.color.red400};
  border: 1px solid ${({ theme }) => theme.color.red400};
  border-radius: 5px;
`;

export const lightGrayBackground = css`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: black;
`;

export const GrayBackground = css`
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
`;

export const clickable = css`
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
`;

export const ButtonCss = css`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

export const Button = styled.button<{
  $background?: string;
  $color?: string;
  $border?: boolean;
}>`
  ${ButtonCss};
  background-color: ${(props) => props.$background || "white"};
  color: ${(props) => props.$color || "black"};
  border: ${(props) => (props.$border ? "1px solid black" : "none")};
  border-radius: 100px;
  padding: 8px;
  font-size: 16px;
  min-width: 76px;
`;

export const ButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${MainColorBackground};
  &:hover {
    ${ReverseMainColorBackground};
  }
`;

export const ReverseButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  &:hover {
    ${MainColorBackground};
  }
`;

export const MainContainer = styled.main<{
  $background?: string;
  $flexdirection?: string;
}>`
  padding: 20px max(30px, calc(50% - 590px));
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.$flexdirection || "column"};
  align-items: center;
  background: ${(props) => props.$background || "none"};
  gap: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid transparent;
  padding: 13px 20px;
  box-shadow: 0 0 12px 0 #0000001a;
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.orange400};
  }

  ${media.tablet} {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 13px 20px;
  box-shadow: 0 0 12px 0 #0000001a;
  width: 100%;
  resize: none;
  color: ${({ theme }) => theme.color.gray900};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.orange400};
  }

  ${media.tablet} {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

export const DropdownMenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  flex-grow: 1;
  min-width: 115px;
  max-width: 131px;
`;

export const DropdownSelector = styled.div`
  ${FlexRowCenter};
  ${clickable};
  width: 100%;
  padding: 12px;
  border-radius: 24px;
  height: 44px;
  box-shadow: 0 0 12px 0 #0000001a;
  background: white;
  font-weight: 600;
  gap: 12px;
`;

export const DropDownListContainer = styled.div`
  ${FlexColumnCenter};
  position: absolute;
  top: calc(100% + 17px);
  left: 0;
  width: 100%;
  border-radius: 8px;
  padding: 6px 4px;
  gap: 2px;
  background: white;
  box-shadow: 0 0 8px 0 #1e212b33;
  z-index: 100;

  ${media.tablet} {
    top: calc(100% + 8px);
  }
`;

export const DropDownOption = styled.div`
  ${FlexColumnCenter};
  ${clickable};
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid transparent;
  width: 100%;
  &:hover {
    background: #f2f4f9;
    border-bottom: 1px solid ${({ theme }) => theme.color.gray100};
  }
`;

export const ModalContainer = styled.div`
  ${FlexRowCenter};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 28px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  & > * {
    width: 100%;
  }
`;
