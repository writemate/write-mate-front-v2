import styled from "styled-components";
import { FontRegular13 } from "./Font";
import HelpSVG from "@/assets/icons/Help.svg";
import { IconSmallButton } from "./Button";
import { FlexRowLeftStart } from ".";
import { media } from "./media";

export const ExplainMessage = styled.p`
  ${FontRegular13}
  color: ${({ theme }) => theme.color.gray400};
  display: none;
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px 12px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  word-break: keep-all;
  width: max-content;
  max-width: 400px;

  z-index: 100;
`;

export const HelpIcon = styled(HelpSVG)`
  ${IconSmallButton}
  fill: ${({ theme }) => theme.color.gray400};
`;

export const HelpContainer = styled.div`
  position: relative;
  margin-left: 2px;
  ${FlexRowLeftStart}
  &:hover ${ExplainMessage} {
    display: block;
  }
  &:hover ${HelpIcon} {
    fill: ${({ theme }) => theme.color.orange500};
  }

  ${media.tablet} {
    ${ExplainMessage} {
      z-index: 100;
      max-width: 200px;
    }
  }
`;
