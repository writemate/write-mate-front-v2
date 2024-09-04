import { createGlobalStyle } from 'styled-components';
import { colorSystem } from './colorSystem';

const peelOffVarFunc = (color: string) => {
  return color.replace('var(', '').replace(')', '');
}

export const GlobalStyles = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css");
  @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap);

  :root {
    ${peelOffVarFunc(colorSystem.black)}: #191919;
    ${peelOffVarFunc(colorSystem.orange75)}:#FFF4EE;
    ${peelOffVarFunc(colorSystem.orange100)}:#FDEFE7;
    ${peelOffVarFunc(colorSystem.orange200)}:#FEDBC8;
    ${peelOffVarFunc(colorSystem.orange400)}:#F49661;
    ${peelOffVarFunc(colorSystem.red400)}:#C55858;
    ${peelOffVarFunc(colorSystem.red500)}:#a44c4c;
    ${peelOffVarFunc(colorSystem.gray25)}:#F8FAFE;
    ${peelOffVarFunc(colorSystem.gray75)}:#EFF1F8;
    ${peelOffVarFunc(colorSystem.gray100)}:#D7DDEA;
    ${peelOffVarFunc(colorSystem.gray200)}:#B1B5C4;
    ${peelOffVarFunc(colorSystem.gray300)}:#898D9D;
    ${peelOffVarFunc(colorSystem.gray900)}:#353535;
  }

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
