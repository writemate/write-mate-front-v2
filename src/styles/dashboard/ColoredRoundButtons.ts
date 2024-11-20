import styled from "styled-components";
import { clickable } from "@/styles";

export const AddWorkspaceButton = styled.button`
  ${clickable}
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: var(--writemate-orange-400, #f49661);
  border: none;

  /* Menu button 1 */
  box-shadow: 0px 0px 8px 0px rgba(255, 84, 0, 0.2);

  color: var(--white, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 100%; /* 16px */
  letter-spacing: 0.32px;
  max-width: 177px;

  &:hover {
    transform: scale(1.05); /* 살짝 확대 효과 */
    filter: brightness(105%);
  }
`;
