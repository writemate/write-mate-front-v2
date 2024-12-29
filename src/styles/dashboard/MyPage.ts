import styled from "styled-components";
import { FlexColumn, FlexRow } from "./IdeaBox/Modal";

/* Modal */
export const ModalContentAndFooterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 70vh;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;

  overflow: auto;

  p {
    color: ${({ theme }) => theme.color.gray900};
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }
`;

export const HalfBackground = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  height: calc(20vh + 30px);
  background: ${({ theme }) => theme.color.orange400};
  opacity: 1;
`;

export const ModalHeader = styled.div`
  ${FlexRow}
  justify-content: 

  p {
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }
`;

import Close from "@/assets/icons/close.svg";
import { clickable, FlexColumnCenter, FlexRowCenter } from "..";
import { media } from "../media";
export const CloseButton = styled(Close)`
  ${clickable}
  position: absolute;
  top: 20px;
  right: 20px;

  background: none;
  path {
    stroke: ${({ theme }) => theme.color.white};
    stroke-width: 2;
  }
`;

export const UserImage = styled.div<{ $src: string }>`
  width: 14vh;
  height: 14vh;
  flex-shrink: 0;
  margin-top: calc(20vh - 7vh - 30px);

  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-color: ${({ theme }) => theme.color.gray200};

  border-radius: 100%;
  border: 2px solid #fff;
  font-size: 18px;
  font-weight: 700;
  z-index: 1;
`;

export const UserNameContainer = styled.div`
  ${FlexRowCenter}
  gap: 8px;
  margin-top: 16px;
  p {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    color: ${({ theme }) => theme.color.gray900};
  }
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.color.orange400} !important;
`;

export const EmailContainer = styled.div`
  margin-top: 8px;
  border: 2px solid ${({ theme }) => theme.color.orange400};
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: ${({ theme }) => theme.color.orange400} !important;
`;

export const UsageListContainer = styled.div`
  ${FlexRow}
  margin-top: 6vh;
  margin-bottom: 6vh;
  width: 100%;
  justify-content: center;
  gap: 16px;

  & > *:not(:last-child) {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -7px; /* gap의 절반 */
      width: 1px;
      height: 80%;
      background-color: ${({ theme }) => theme.color.gray200};
    }
  }

  ${media.tablet} {
    flex-direction: row;
  }
`;

export const UsageContainer = styled.div`
  ${FlexColumnCenter}
  width: 100px;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.color.gray900};

  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 200%;
    color: ${({ theme }) => theme.color.gray900};
  }

  ${media.tablet} {
    width: 70px;
    font-size: 22px;
    p {
      font-size: 12px;
    }
  }
`;

export const FooterContainer = styled.div`
  ${FlexRow}
  justify-content: space-between;
  align-items: flex-end;
  color: ${({ theme }) => theme.color.gray400};

  p {
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    text-align: center;
    color: ${({ theme }) => theme.color.gray400};
  }

  ${media.tablet} {
    flex-direction: row;
    gap: 0;
  }
`;

export const PolicyLinks = styled.div`
  margin-right: 1rem;
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray400};
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Logout = styled.a`
  font-size: 12px;
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
