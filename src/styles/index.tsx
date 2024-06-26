import {styled, css, keyframes } from 'styled-components';

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
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

export const ReverseMainColorBackground = css`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
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

export const MainContainer = styled.main<{ $background?: string, $flexdirection?: string }>`
  padding: 20px max(30px, calc(50% - 590px));
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$flexdirection || 'column'};
  background: ${props => props.$background || 'none'};
  gap: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  flex-grow: 0;
  &:focus {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;
