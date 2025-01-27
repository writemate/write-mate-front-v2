import { styled } from "styled-components";
import { Button, clickable, FlexRowCenter, FlexRowLeftStart } from "..";
import Guide from "@/assets/icons/guide.svg";
import IdeaBox from "@/assets/icons/ideabox.svg";
import Download from "@/assets/icons/download.svg";
import Profile from "@/assets/icons/profile.svg";
import { media } from "../media";
import Link from "next/link";
import { GrayTextButton } from "../Button";
import { FontSemibold16 } from "../Font";

export const HeaderContainer = styled.header`
  ${FlexRowLeftStart};
  width: 100%;
  height: 72px;
  background-color: #ffffff;
  border-bottom: 1px solid #d7dce7;
  flex-shrink: 0;
  flex-grow: 0;

  ${media.tablet} {
    height: fit-content;
    padding: 15px;
  }
`;

export const HeaderTitle = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-left: 28px;
  padding-right: 16px;

  display: flex;
  flex-direction: row;
  gap: 4px;

  flex-shrink: 0;

  svg {
    flex-shrink: 0;
  }

  ${media.tablet} {
    padding: 0;
    font-size: 16px;
    margin: 0 8px 0 0;
  }

  div {
    ${FlexRowCenter};
    gap: 4px;
  }
`;

export const HeaderLink = styled(Link)`
  ${GrayTextButton}
  ${FontSemibold16}
  color: ${({ theme }) => theme.color.gray500};
`;

export const HeaderButton = styled.button`
  ${GrayTextButton}
  ${FontSemibold16}
  color: ${({ theme }) => theme.color.gray500};
`;

export const SaveStatus = styled.div`
  ${FlexRowCenter};
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray400};
  width: fit-content;
  white-space: nowrap;

  ${media.tablet} {
    font-size: 12px;
  }
`;

export const VersionControlButton = styled.div`
  ${clickable}
  ${FlexRowCenter};
  flex-shrink: 0;
  margin-left: auto;
  font-size: 16px;
  color: var(--cod-gray);
  background: radial-gradient(
      29.27% 111.5% at 68.06% 54.17%,
      rgba(200, 200, 200, 0.2) 0%,
      rgba(198, 198, 198, 0) 100%
    ),
    var(--white, #fff);
  border: none;
  padding: 8px 12px 8px 24px;
  gap: 8px;
  border-radius: 100px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12);

  ${media.tablet} {
    display: none;
  }
`;

export const RightContainer = styled.div`
  ${FlexRowLeftStart};
  margin-left: 16px;
  margin-right: 28px;
  gap: 12px;
  font-size: 0;

  ${media.tablet} {
    display: none;
  }
`;

export const GuideButton = styled(Guide)`
  ${clickable}
  &:not(:hover) {
    & > rect {
      display: none;
    }
  }

  ${media.tablet} {
    display: none;
  }
`;

export const IdeaBoxButton = styled(IdeaBox)`
  ${clickable}
  &:not(:hover) {
    & > rect {
      display: none;
    }
  }

  ${media.tablet} {
    display: none;
  }
`;

export const DownloadButton = styled(Download)`
  ${clickable}
  &:not(:hover) {
    & > rect {
      display: none;
    }
  }

  ${media.tablet} {
    display: none;
  }
`;

export const ProfileButton = styled(Profile)`
  ${clickable}
  &:hover {
    & rect {
      fill: ${({ theme }) => theme.color.orange500};
    }
    & path {
      stroke: #ffffff;
    }
  }

  ${media.tablet} {
    display: none;
  }
`;
