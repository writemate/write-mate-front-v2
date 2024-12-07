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
  UPDATE_CHAPTER_FOLD_All: (plotId: string) =>
    `/api/plots/${plotId}/chapters/folded`,
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

  GET_CHARACTER_LIST: (workId: string) => `/api/works/${workId}/characters`,
  CREATE_CHARACTER: (workId: string) => `/api/works/${workId}/characters`,
  GET_CHARACTER_DETAIL: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}`,
  DELETE_CHARACTER: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}`,
  UPDATE_CHARACTER_NAME: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/name`,
  UPDATE_CHARACTER_MAIN: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/main`,
  UPDATE_CHARACTER_BIRTHDAY: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/birthday`,
  UPDATE_CHARACTER_DESCRIPTION: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/description`,
  UPDATE_CHARACTER_ROLE: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/role`,
  UPDATE_CHARACTER_GENDER: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/gender`,
  UPDATE_CHARACTER_IMAGE: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/image`,
  ADD_CHARACTER_CHARACTERISTIC: (workId: string, characterId: string) => `/api/works/${workId}/characters/${characterId}/characteristic`,
  DELETE_CHARACTER_CHARACTERISTIC: (workId: string, characterId: string, index: number) => `/api/works/${workId}/characters/${characterId}/characteristic?idx=${index}`,
  UPDATE_CHARACTER_CHARACTERISTIC_TITLE: (workId: string, characterId: string, index: number) => `/api/works/${workId}/characters/${characterId}/characteristic/title?idx=${index}`,
  UPDATE_CHARACTER_CHARACTERISTIC_CONTENT: (workId: string, characterId: string, index: number) => `/api/works/${workId}/characters/${characterId}/characteristic/content?idx=${index}`,
  ADD_CHARACTER_KEYWORD: (workId: string, characterId: string, keywordId: string) => `/api/works/${workId}/characters/${characterId}/keywords/${keywordId}`,
  DELETE_CHARACTER_KEYWORD: (workId: string, characterId: string, keywordId: string) => `/api/works/${workId}/characters/${characterId}/keywords/${keywordId}`,

  GET_KEYWORD_LIST: (workId: string) => `/api/works/${workId}/keywords`,
  CREATE_KEYWORD: (workId: string) => `/api/works/${workId}/keywords`,
  DELETE_KEYWORD: (workId: string, keywordId: string) => `/api/works/${workId}/keywords/${keywordId}`,

  GET_RELATION_LIST: (workId: string) => `/api/works/${workId}/arrows`,
  CREATE_RELATION: (workId: string) => `/api/works/${workId}/arrows`,
  DELETE_RELATION: (workId: string, arrowId: string) => `/api/works/${workId}/arrows/${arrowId}`,
  UPDATE_RELATION: (workId: string, arrowId: string) => `/api/works/${workId}/arrows/${arrowId}`,


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
    idx: number
  ) => `/api/memos/characters/${memoCharacterId}/characteristic/${idx}`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE: (
    memoCharacterId: string,
    idx: number
  ) => `/api/memos/characters/${memoCharacterId}/characteristic/${idx}/title`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT: (
    memoCharacterId: string,
    idx: number
  ) => `/api/memos/characters/${memoCharacterId}/characteristic/${idx}/content`,
};
