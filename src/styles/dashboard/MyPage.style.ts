import styled from "styled-components";
import { FlexColumnCenter, FlexRowCenter, FlexRowSpaceBetween } from "@/styles";
import { media } from "@/styles/media";
import { FontBold20, FontBold24, FontSemibold14 } from "@/styles/Font";
import Close from "@/assets/icons/close.svg";
import { WhiteXButton } from "@/styles/Button";

/* Modal */
export const ModalContentAndFooterContainer = styled.div`
  ${FlexColumnCenter}
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 70vh;
  padding: 30px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  overflow: auto;
`;

export const HalfBackground = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  height: calc(20vh + 30px);
  background: ${({ theme }) => theme.color.orange400};
  opacity: 1;
`;

export const UserImage = styled.div<{ $src: string }>`
  ${FlexRowCenter}
  width: 14vh;
  height: 14vh;
  flex-shrink: 0;
  margin-top: calc(20vh - 7vh - 30px);

  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-color: ${({ theme }) => theme.color.gray200};

  border-radius: 100%;
  border: 2px solid #fff;

  z-index: 1;
`;

export const UserNameContainer = styled.div`
  ${FlexRowCenter}
  ${FontBold20}
  color: ${({ theme }) => theme.color.gray900};
  gap: 8px;
  margin-top: 16px;
`;

export const Name = styled.p`
  color: ${({ theme }) => theme.color.orange400};
`;

export const EmailContainer = styled.div`
  ${FontSemibold14}
  color: ${({ theme }) => theme.color.orange400};
  border: 2px solid ${({ theme }) => theme.color.orange400};
  border-radius: 9999px;
  margin-top: 8px;
  padding: 4px 12px;

  ${media.tablet} {
    border: 1px solid ${({ theme }) => theme.color.orange400};
  }
`;

export const UsageListContainer = styled.div`
  ${FlexRowCenter}
  margin-top: 6vh;
  margin-bottom: 6vh;
  width: 100%;
  gap: 16px;

  & > *:not(:last-child) {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -7px;
      width: 1px;
      height: 80%;
      background-color: ${({ theme }) => theme.color.gray200};
    }
  }
`;

export const UsageContainer = styled.div`
  ${FlexColumnCenter}
  ${FontBold24}
  color: ${({ theme }) => theme.color.gray700};
  width: 100px;
  text-align: center;
  & > p {
    ${FontSemibold14}
  }
  ${media.tablet} {
    width: 70px;
  }
`;

export const FooterContainer = styled.div`
  ${FlexRowSpaceBetween}
  ${FontSemibold14}
  color: ${({ theme }) => theme.color.gray400};
  width: 100%;
  align-items: flex-end;
  ${media.tablet} {
    flex-direction: row;
    gap: 0;
  }
`;

export const PolicyLinks = styled.div`
  margin-right: 1rem;
  font-size: 12px;
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

export const CloseButton = styled(Close)`
  ${WhiteXButton}
  position: absolute;
  top: 20px;
  right: 20px;
`;
