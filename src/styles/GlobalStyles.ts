import { createGlobalStyle } from "styled-components";
import { colorSystem } from "./colorSystem";

export const GlobalStyles = createGlobalStyle`
  body,
  html {
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    margin: 0;
    padding: 0;
    max-width: 100vw;
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    padding: 0;
    margin: 0;
  }

  body {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${colorSystem.gray900};
  }

  a {
    text-decoration: none;
    color: inherit
  }

  
`;
