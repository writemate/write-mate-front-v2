"use client";
import { styled } from "styled-components";
import {
  clickable,
  FlexColumnCenter,
  FlexColumnLeftStart,
  FlexRowCenter,
  FlexRowSpaceBetween,
} from "@/styles";
import { GtagForClick } from "@/utils/GtagForClick";
import Image from "next/image";
import Link from "next/link";

export const TopTitle = styled.h1<{ $color?: boolean }>`
  user-select: none;
  font-size: 5.5rem;
  font-weight: 500;
  text-align: center;
  line-height: 6rem;
  width: 100%;
  ${({ $color }) =>
    !$color
      ? "color: black;"
      : `color: transparent; background: linear-gradient(90deg, #d65554, #ff7d7e); -webkit-background-clip: text; background-clip: text;`}
`;

export const SubTitle = styled.p`
  user-select: none;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1.5rem;
  width: 100%;
`;

export const LoginButton = styled.button`
  ${clickable};
  margin: 2rem auto;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.red400};
  color: white;
  border: 1px solid ${({ theme }) => theme.color.red400};
  border-radius: 5px;
  transition: all 0.3s;
`;

export const UserContainer = styled.div`
  ${FlexColumnCenter};
  width: 100%;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  padding: 5rem 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
    background: rgb(226 232 240 / 0.4);
    z-index: -1;
  }
`;

export const FeatureContainer = styled.div<{ $background?: boolean }>`
  ${FlexRowCenter};
  position: relative;
  gap: 2rem;
  padding: 5rem 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100%;
    background: ${({ $background }) =>
      $background ? "rgb(226 232 240 / 0.4)" : "white"};
    z-index: -1;
  }
`;

export const FeatureTitle = styled.h2<{ $color?: boolean }>`
  white-space: pre-wrap;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: left;
`;

//color면 #d65554에서 #ff7d7e로 그라데이션
export const ColorableText = styled.span<{
  $color?: boolean;
  $isBig?: boolean;
}>`
  font-weight: 700;
  ${({ $color }) =>
    !$color
      ? "color: black;"
      : `color: transparent; background: linear-gradient(90deg, #d65554, #ff7d7e); -webkit-background-clip: text; background-clip: text;`}
  ${({ $isBig }) =>
    $isBig
      ? `
        font-size: 6rem;
        font-weight: 500;
    `
      : ""}
`;

export const BoldableText = styled.span<{ $bold?: boolean }>`
  ${({ $bold }) => ($bold ? "font-weight: 600;" : "font-weight: 400;")}
`;

export const FeatureImage = styled(Image)`
  max-width: 50%;
  height: auto;
`;

export const FeatrueInfoContainer = styled.div`
  ${FlexColumnLeftStart};
  gap: 1rem;
  max-width: 50%;
  word-break: keep-all;
`;

export const FeatureDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  text-align: left;
  color: rgb(102 102 102 / 1);
`;

export const FeatureLink = styled(Link)`
  ${clickable};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.red400};
  transition: all 0.3s;
  &:hover {
    color: ${({ theme }) => theme.color.red500};
  }
  &::after {
    content: "→";
    margin-left: 0.5rem;
    font-weight: 600;
  }
`;

export const CommentContainer = styled.div`
  ${FlexColumnCenter};
  gap: 1rem;
  margin-top: 1rem;
  white-space: pre-wrap;
  width: 100%;
`;

export const FeatureComment = styled.div<{ $position: "left" | "right" }>`
  font-size: 1rem;
  align-self: ${({ $position }) =>
    $position === "left" ? "flex-start" : "flex-end"};
  text-align: left;
  max-width: 70%;
  padding: 1rem;
  background: rgb(255 236 236);
  border-radius: 5px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: calc(50% - 10px);
    border: 20px solid transparent;
    border-bottom: 0;
    ${({ $position }) =>
      $position === "left"
        ? `
            left: -20px;
            border-right-color: rgb(255 236 236);
            border-left: 0;
        `
        : `
            right:-20px;
            border-left-color: rgb(255 236 236);
            border-right: 0;
        `}
  }
`;

export const CounterContainer = styled.div`
  ${FlexRowSpaceBetween};
  width: 100%;
  max-width: 880px;
  margin-top: 2rem;
  > div {
    ${FlexColumnCenter};
    gap: 0.5rem;
  }
  @media (max-width: 768px) {
    ${FlexColumnCenter};
    gap: 2rem;
  }
`;

export const NavigationButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 50;
  transform: translateY(-50%);
  border: 2px solid #6b7280;
  border-radius: 50%;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.swiper-button-prev {
    left: 4rem;
    transform: rotate(180deg);
  }
  &.swiper-button-next {
    right: 4rem;
    margin-top: 1rem;
  }

  svg {
    fill: #6b7280;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
