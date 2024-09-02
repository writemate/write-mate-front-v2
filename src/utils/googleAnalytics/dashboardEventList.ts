import * as Generator from "./propertiesGenerators";

export const workstudioEventList = {
    tap: {
        type: 'workstudio_tap',
        description: '작품 스튜디오에서 집필 전/중/완료 탭 클릭',
        generateProperties: Generator.executeEvent<"before" | "ongoing" | "complete">(),
    },
    moveToBefore: {
        type: 'workstudio_move_to_before',
        description: '작품 스튜디오에서 작품을 집필 전으로 이동',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
    moveToWriting: {
        type: 'workstudio_move_to_writing',
        description: '작품 스튜디오에서 작품을 집필 중으로 이동',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
    moveToComplete: {
        type: 'workstudio_move_to_complete',
        description: '작품 스튜디오에서 작품을 완결로 이동',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
    changeName: {
        type: 'workstudio_change_name',
        description: '작품 스튜디오에서 작품 이름 변경',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
    changeImage: {
        type: 'workstudio_change_image',
        description: '작품 스튜디오에서 작품 이미지 변경',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
    delete: {
        type: 'workstudio_delete',
        description: '작품 스튜디오에서 작품 삭제',
        generateProperties: Generator.fromEvent<"before" | "ongoing" | "complete">(),
    },
};

export const ideaBoxEventList = {
    tap: {
        type: 'idea_box_tap',
        description: '아이디어 보관함에서 메모/인물/사건 탭 클릭',
        generateProperties: Generator.executeEvent<"events" | "characters" | "memos">(),
    },
    moveToTrash: {
        type: 'idea_box_delete',
        description: '아이디어 보관함에서 작품을 삭제',
        generateProperties: Generator.fromEvent<"events" | "characters" | "memos">(),
    },
    add: {
        type: 'idea_box_add',
        description: '아이디어 보관함에 추가',
        generateProperties: Generator.fromEvent<"events" | "characters" | "memos">(),
    },
};

export const trashEvent = {
    type: 'trash',
    description: '휴지통에서 작품 삭제 or 복원',
    generateProperties: Generator.executeEvent<"delete" | "restore">(),
}
