'use client';
import { styled } from 'styled-components';
import { clickable, FlexRowCenter, FlexRowLeftStart } from '..';
import { GtagForClick } from '@/utils/GtagForClick';
import Guide from "@/assets/icons/guide.svg";
import IdeaBox from "@/assets/icons/ideaBox.svg";
import Download from "@/assets/icons/download.svg";
import Profile from "@/assets/icons/profile.svg";

export const HeaderContainer = styled.header`
  ${FlexRowLeftStart};
  width: 100%;
  height: 72px;
  background-color: #ffffff;
  border-bottom: 1px solid #D7DCE7;
  flex-shrink: 0;
  flex-grow: 0;
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 24px 0 28px;
`;

export const SaveStatus = styled.div`
  ${FlexRowCenter};
  font-size: 14px;
  color: var(--cod-gray);
`;

export const VersionControlButton = styled.div`
  ${clickable}
  ${FlexRowCenter};
  margin-left: auto;
  font-size: 16px;
  color: var(--cod-gray);
  background: radial-gradient(29.27% 111.5% at 68.06% 54.17%, rgba(200, 200, 200, 0.20) 0%, rgba(198, 198, 198, 0.00) 100%), var(--white, #FFF);
  border: none;
  padding: 8px 12px 8px 24px;
  gap: 8px;
  border-radius: 100px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.12);
`;

export const RightContainer = styled.div`
  ${FlexRowLeftStart};
  margin-left: 16px;
  margin-right: 28px;
  gap: 12px;
`;

export const GuideButton = styled(Guide)`
  ${clickable}
  &:not(:hover) {
    &>rect {
      display: none;
    }
  }
`;

export const IdeaBoxButton = styled(IdeaBox)`
  ${clickable}
  &:not(:hover) {
    &>rect {
      display: none;
    }
  }
`;

export const DownloadButton = styled(Download)`
  ${clickable}
  &:not(:hover) {
    &>rect {
      display: none;
    }
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
`;
