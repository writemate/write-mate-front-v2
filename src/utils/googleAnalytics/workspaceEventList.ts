import * as Generator from "./propertiesGenerators";

export const closeIdeaStorage = {
    type: 'idea_close',
    description: '아이디어 폴더 닫기',
}

export const openIdeaStorage = {
    type: 'idea_open',
    description: '아이디어 폴더 열기',
}

export const copyIdea = {
    type: 'idea_copy',
    description: '아이디어 복사',
    generateProperties: Generator.fromEvent<"events" | "characters" | "memos">(),
}

export const plotEventList = {
    chapterClose: {
        type: 'plot_chapter_close',
        description: '플롯 폴더 닫기',
    },
    chapterOpen: {
        type: 'plot_chapter_open',
        description: '플롯 폴더 열기',
    },
    chapterAdd: {
        type: 'plot_chapter_add',
        description: '플롯 폴더 추가',
    },
    chapterDelete: {
        type: 'plot_chapter_delete',
        description: '플롯 폴더 삭제',
    },
    chapterMove: {
        type: 'plot_chapter_move',
        description: '플롯 폴더 이동',
        generateProperties: Generator.moveEvent,
    },
    eventAdd: {
        type: 'plot_event_add',
        description: '플롯 사건 추가',
    },
    eventDelete: {
        type: 'plot_event_delete',
        description: '플롯 사건 삭제',
    },
    eventMove: {
        type: 'plot_event_move',
        description: '플롯 사건 이동',
        generateProperties: Generator.moveEvent,
    },
}

export const characterEventList = {
    addCharacter: {
        type: 'character_add',
        description: '인물 추가',
    },
    networkTab: {
        type: 'network_tab',
        description: '인물 관계도 클릭',
    },
    addNetwork: {
        type: 'network_add',
        description: '관계 추가',
        generateProperties: Generator.fromEvent<"first">(),
    },
    createNetwork: {
        type: 'network_create',
        description: '관계 생성',
        generateProperties: {},
    },
}
