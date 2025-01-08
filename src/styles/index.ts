import { styled, css, keyframes } from "styled-components";
import { media } from "./media";
import Close from "@/assets/icons/close.svg";

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

export const InputWithText = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-radius: 12px;
  font-size: 16px;
  border: 1px solid transparent;
  padding: 13px 20px;
  box-shadow: 0 0 12px 0 #0000001a;
  background: ${({ theme }) => theme.color.white};
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};

  &:has(input:focus) {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.orange400};
  }

  & > input {
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    text-align: right;
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
  height: 44px;
  padding: 12px;
  gap: 12px;

  background: white;
  border-radius: 24px;
  box-shadow: 0 0 12px 0 #0000001a;

  font-size: 16px;
  font-weight: 700;
  line-height: 100%;

  & > span {
    width: 100%;
    text-align: center;
  }

  & > svg {
    flex-shrink: 0;
  }
`;

export const DropDownListContainer = styled.div`
  ${FlexColumnCenter};
  position: absolute;
  top: calc(100% + 11px);
  left: 0;
  z-index: 100;

  width: 100%;
  padding: 6px 6px;
  gap: 2px;

  background: white;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 #1e212b33;

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

  font-size: 13px;
  font-weight: 400;
  line-height: 135%;

  align-items: flex-start;

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
  & > div {
    width: 100%;
    height: auto !important;
  }

  ${media.tablet} {
    padding: 20px;
  }
`;

export const DeleteButton = styled.div`
  ${ButtonCss};
  background-color: ${({ theme }) => theme.color.red600};
  color: #fff;
  border-radius: 30px;
  padding: 10px 14px;
`;

export const CloseButton = styled(Close)`
  ${clickable};
`;
