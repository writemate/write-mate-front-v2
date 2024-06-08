import * as Generator from "./propertiesGenerators";

export const signupAtHeader = {
    type: 'signup',
    description: '헤더에 있는 회원가입 버튼 클릭',
    generateProperties: Generator.signupEvent('header'),
};

export const signupAtTopOfMain = {
    type: 'signup',
    description: '메인 페이지 위쪽에 있는 회원가입 버튼 클릭',
    generateProperties: Generator.signupEvent('main_top'),
};

export const signupAtBottomOfMain = {
    type: 'signup',
    description: '메인 페이지 아래쪽에 있는 회원가입 버튼 클릭',
    generateProperties: Generator.signupEvent('main_bottom'),
};

export const resizeEvent = {
    type: 'resize',
    description: '창 크기 조절',
    generateProperties: Generator.screenSizeEvent,
};
