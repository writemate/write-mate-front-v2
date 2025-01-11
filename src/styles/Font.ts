import { css } from "styled-components";
import { media } from "./media";

export const FontUnvisible = css`
  font-size: 0;
`;

/*
 * 타블렛 용 폰트 사이즈
 */
export const FontTabletRegular13 = css`
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;

export const FontTabletRegular14 = css`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

export const FontTabletSemibold14 = css`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;

export const FontTabletRegular16 = css`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`;

export const FontTabletSemibold16 = css`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
`;

export const FontTabletBold20 = css`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;

export const FontTabletBold24 = css`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */
`;

/*
 * 데스크탑용 폰트 사이즈
 */
export const FontSemibold14 = css`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */

  ${media.tablet} {
    ${FontTabletRegular13}
  }
`;

export const FontRegular16 = css`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 450;
  line-height: 150%; /* 24px */

  ${media.tablet} {
    ${FontTabletRegular14}
  }
`;

export const FontSemibold16 = css`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */

  ${media.tablet} {
    ${FontTabletSemibold14}
  }
`;

export const FontBold20 = css`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */

  ${media.tablet} {
    ${FontTabletSemibold16}
  }
`;

export const FontBold24 = css`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 36px */

  ${media.tablet} {
    ${FontTabletBold20}
  }
`;

export const FontBold28 = css`
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 42px */

  ${media.tablet} {
    ${FontTabletBold24}
  }
`;
