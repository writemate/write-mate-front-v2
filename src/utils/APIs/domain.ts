import { workspaceCategory } from "./types";

export const DOMAIN = {
  GET_USER: "/api/users",
  CREATE_USER: "/api/users",

  GET_WORKLIST: (
    category: (typeof workspaceCategory)[keyof typeof workspaceCategory]
  ) => `/api/works?category=${category}`,
  CREATE_WORK: "/api/works",
  GET_WORK: (workId: string) => `/api/works/${workId}`,
  DELETE_WORK: (workId: string) => `/api/works/${workId}`,
  UPDATE_WORK_CATEGORY: (workId: string) => `/api/works/${workId}/category`,
  UPDATE_WORK_TITLE: (workId: string) => `/api/works/${workId}/title`,
  UPDATE_WORK_COVER: (workId: string) => `/api/works/${workId}/cover`,
  UPDATE_WORK_LOGLINE: (workId: string) => `/api/works/${workId}/logline`,
  UPDATE_WORK_GENRE: (workId: string) => `/api/works/${workId}/genre`,
  UPDATE_WORK_QUANTITY: (workId: string) => `/api/works/${workId}/quantity`,
  UPDATE_WORK_INTRODUCTION: (workId: string) =>
    `/api/works/${workId}/introduction`,
  UPDATE_WORK_GRADE: (workId: string) => `/api/works/${workId}/grade`,

  GET_PLOT_LIST: (workId: string) => `/api/works/${workId}/plotlist`,
  UPDATE_PLOT_LIST: (workId: string) => `/api/works/${workId}/plotlist`,
  GET_SCRIPT_LIST: (workId: string) => `/api/works/${workId}/scriptlist`,
  UPDATE_SCRIPT_LIST: (workId: string) => `/api/works/${workId}/scriptlist`,

  CREATE_PLOT: (workId: string) => `/api/plots?workId=${workId}`,
  DELETE_PLOT: (plotId: string) => `/api/plots/${plotId}`,
  UPDATE_PLOT_NAME: (plotId: string) => `/api/plots/${plotId}/name`,
  SET_MAIN_PLOT: (plotId: string) => `/api/plots/${plotId}/main`,

  CREATE_SCRIPT: (workId: string) => `/api/scripts?workId=${workId}`,
  DELETE_SCRIPT: (scriptId: string) => `/api/scripts/${scriptId}`,
  UPDATE_SCRIPT_NAME: (scriptId: string) => `/api/scripts/${scriptId}/name`,
  SET_MAIN_SCRIPT: (scriptId: string) => `/api/scripts/${scriptId}/main`,

  GET_CHAPTER_LIST_WITH_EVENTS: (plotId: string) => `/api/plots/${plotId}`,
  CREATE_CHAPTER: (plotId: string) => `/api/plots/${plotId}/chapters`,
  DELETE_CHAPTER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}`,
  UPDATE_CHAPTER_NAME: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}/name`,
  UPDATE_CHAPTER_DESCRIPTION: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}/description`,
  UPDATE_CHAPTER_ORDER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}/order`,
  UPDATE_CHAPTER_FOLD: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}/folded`,

  CREATE_EVENT: (chapterId: string) => `/api/chapters/${chapterId}/pevents`,
  DELETE_EVENT: (chapterId: string, peventId: string) =>
    `/api/chapters/${chapterId}/pevents/${peventId}`,
  UPDATE_EVENT_NAME: (chapterId: string, peventId: string) =>
    `/api/chapters/${chapterId}/pevents/${peventId}/name`,
  UPDATE_EVENT_DESCRIPTION: (chapterId: string, peventId: string) =>
    `/api/chapters/${chapterId}/pevents/${peventId}/description`,
  UPDATE_EVENT_ORDER: (chapterId: string, peventId: string) =>
    `/api/chapters/${chapterId}/pevents/${peventId}/order`,

  ADD_EVENT_CHARACTER: (
    chapterId: string,
    peventId: string,
    characterId: string
  ) =>
    `/api/chapters/${chapterId}/pevents/${peventId}/character/${characterId}`,
  DELETE_EVENT_CHARACTER: (
    chapterId: string,
    peventId: string,
    characterId: string
  ) =>
    `/api/chapters/${chapterId}/pevents/${peventId}/character/${characterId}`,

  GET_MEMO_LIST: `/api/memos`,
  CREATE_MEMO: `/api/memos`,
  DELETE_MEMO: (memoId: string) => `/api/memos/${memoId}`,
  UPDATE_MEMO_NAME: (memoId: string) => `/api/memos/${memoId}/name`,
  UPDATE_MEMO_DESCRIPTION: (memoId: string) =>
    `/api/memos/${memoId}/description`,

  GET_MEMO_CHARACTER_LIST: `/api/memos/characters`,
  GET_MEMO_CHARACTER: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}`,
  CREATE_MEMO_CHARACTER: `/api/memos/characters`,
  DELETE_MEMO_CHARACTER: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}`,
  UPDATE_MEMO_CHARACTER_NAME: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/name`,
  UPDATE_MEMO_CHARACTER_ROLE: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/role`,
  UPDATE_MEMO_CHARACTER_GENDER: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/gender`,
  UPDATE_MEMO_CHARACTER_DESCRIPTION: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/description`,
  UPDATE_MEMO_CHARACTER_BIRTHDAY: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/birthday`,
  UPDATE_MEMO_CHARACTER_IMAGE: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/image`,
  CREATE_MEMO_CHARACTER_CHARACTERISTIC: (memoCharacterId: string) =>
    `/api/memos/characters/${memoCharacterId}/characteristic`,
  DELETE_MEMO_CHARACTER_CHARACTERISTIC: (
    memoCharacterId: string,
    characteristicId: string
  ) =>
    `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE: (
    memoCharacterId: string,
    characteristicId: string
  ) =>
    `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/title`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT: (
    memoCharacterId: string,
    characteristicId: string
  ) =>
    `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/content`,
};
