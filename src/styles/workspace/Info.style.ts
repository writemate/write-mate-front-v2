"use client";
import { styled } from "styled-components";
import {
  clickable,
  DeleteButton,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowLeftStart,
  FlexRowSpaceBetween,
} from "@/styles";
import Back from "@/assets/workspace/character/back.svg";
import { media } from "../media";
import { FontBold20 } from "../Font";
import {
  Round9999EmptyBackgoundOrangeColor,
  Round9999OrangeBackgoundWhiteColor,
} from "../Button";
import Link from "next/link";

export const BackButton = styled(Back)`
  flex-shrink: 0;
  cursor: pointer;
  margin-bottom: 73px;
  margin-right: auto;

  ${media.tablet} {
    margin-bottom: 20px;
  }
`;

export const CoverContainer = styled.div`
  position: relative;
  ${FlexRowLeftStart};
  align-items: flex-end;
  gap: 36px;
  width: 100%;

  ${media.tablet} {
    ${FlexColumnCenter}
    gap: 20px;
  }
`;
export const BlurBackground = styled.div<{ $src: string | null }>`
  ${({ $src }) => $src && `background-image: url(${$src});`}
  ${({ $src }) => !$src && `background-color: #888888;`}
      content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4.72px;
  z-index: 0;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(10px);
`;
export const CoverImage = styled.img<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid #ffffff57;
  z-index: 1;
`;
export const ChangeCover = styled.div`
  ${FlexRowCenter}
  display: none;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4.72px;
  z-index: 2;
  background-color: #00000080;
  cursor: pointer;
  & > span {
    ${FlexRowCenter};
    color: ${({ theme }) => theme.color.orange500};
    border-radius: 100px;
    padding: 12px 20px;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.color.orange500};
    box-shadow: 1px 1px 4px 0 #0000001f;
    background-color: #ffffff;
  }

  ${media.tablet} {
    & > span {
      padding: 8px 12px;
      font-size: 12px;
    }
  }
`;
export const CoverImageContainer = styled.div`
  ${FlexRowCenter}
  flex-shrink: 0;
  width: 263px;
  height: 341px;
  border-radius: 4.72px;
  padding: 55px 44px;
  position: relative;
  overflow: hidden;

  &:hover {
    ${ChangeCover} {
      display: flex;
    }
  }

  ${media.tablet} {
    width: 150px;
    height: 196px;
    padding: 20px 16px;
  }
`;
export const ChangeCoverInput = styled.input`
  display: none;
  ${media.tablet} {
    width: 100%;
    aspect-ratio: 263 / 341;
    padding: 0;
  }
`;

// 작품 정보
export const SubTitle = styled.h2`
  ${FlexRowLeftStart}
  ${FontBold20}
  height: fit-content;
  color: ${({ theme }) => theme.color.gray900};
  margin-bottom: 20px;

  ${media.tablet} {
    margin-bottom: 12px;
  }
`;

export const CoverContentsContainer = styled.div`
  ${FlexColumnLeftStart};
  height: 100%;
  width: 100%;
  min-width: 263px;
  width: calc(100% - 263px - 36px);
  justify-content: flex-end;
  flex-grow: 1;

  & > ${SubTitle} {
    margin-top: 46px;
    ${media.tablet} {
      margin-top: 20px;
    }
  }

  ${media.tablet} {
    width: 100%;
    justify-content: flex-start;
    height: fit-content;
    margin-top: 20px;

    & > ${DeleteButton} {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;
export const AddMemoButtonContainer = styled.button`
  position: relative;
  ${Round9999OrangeBackgoundWhiteColor}
`;

export const SubTitleWithButton = styled.div`
  ${FlexRowSpaceBetween}
  align-items: center;
  width: 100%;
  height: fit-content;
  min-height: 30px;
  margin-bottom: 10px;
  position: relative;

  & > h2 {
    margin-bottom: 0;
  }

  & > ${AddMemoButtonContainer} {
    position: relative;
  }

  ${media.tablet} {
    margin-bottom: 12px;
  }
`;

export const Infos = styled.div`
  ${FlexColumnCenter}
  gap: 60px;
  width: 100%;
  margin-top: 60px;

  ${media.tablet} {
    gap: 20px;
    margin-top: 20px;
  }
`;

export const Container = styled.div`
  ${FlexColumnLeftStart}
  width: 100%;
`;

export const TextWithDropMenu = styled.div`
  ${FlexRowLeftStart};
  gap: 10px;
  width: 100%;

  ${media.tablet} {
    font-size: 14px;
  }
`;

export const DropdownMenu = styled.div`
  ${clickable};
  ${FlexRowCenter};
  gap: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.gray200};
  color: ${({ theme }) => theme.color.gray900};

  ${media.tablet} {
    font-size: 12px;
  }
`;

export const TextNavigationLink = styled(Link)`
  ${Round9999EmptyBackgoundOrangeColor}
  position: relative;
`;

export const TextNavigationButton = styled.button`
  ${Round9999EmptyBackgoundOrangeColor}
  position: relative;
`;
