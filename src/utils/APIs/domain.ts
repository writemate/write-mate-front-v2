import { workspaceCategory } from "./types";

export const DOMAIN = {
  GET_USER: "/api/users",
  CREATE_USER: "/api/users",

  GET_WORKLIST: (
    category: (typeof workspaceCategory)[keyof typeof workspaceCategory]
  ) => `/api/works?category=${category}`,
  CREATE_WORK: "/api/works",
  GET_WORK: (workId: string) => `/api/works/${workId}`,

  GET_PLOT: (workId: string) => `/api/works/${workId}/plots`,

  CREATE_CHAPTER: (plotId: string) => `/api/plots/${plotId}/plots`,
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
  DELETE_EVENT: (peventId: string) => `/api/pevents/${peventId}`,
  UPDATE_EVENT_NAME: (peventId: string) => `/api/pevents/${peventId}/name`,
  UPDATE_EVENT_DESCRIPTION: (peventId: string) =>
    `/api/pevents/${peventId}/description`,
  UPDATE_EVENT_ORDER: (peventId: string) => `/api/pevents/${peventId}/order`,

  UPDATE_EVENT_CHARACTER: (peventId: string, characterId: string) =>
    `/api/pevents/${peventId}/character/${characterId}`,

  GET_MEMO_LIST: `/api/memos`,
  CREATE_MEMO: `/api/memos`,
  DELETE_MEMO: (memoId: string) => `/api/memos/${memoId}`,
  UPDATE_MEMO_NAME: (memoId: string) => `/api/memos/${memoId}/name`,
  UPDATE_MEMO_DESCRIPTION: (memoId: string) => `/api/memos/${memoId}/description`,

  GET_MEMO_CHARACTER_LIST: `/api/memos/characters`,
  CREATE_MEMO_CHARACTER: `/api/memos/characters`,
  DELETE_MEMO_CHARACTER: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}`,
  UPDATE_MEMO_CHARACTER_NAME: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/name`,
  UPDATE_MEMO_CHARACTER_ROLE: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/role`,
  UPDATE_MEMO_CHARACTER_GENDER: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/gender`,
  UPDATE_MEMO_CHARACTER_DESCRIPTION: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/description`,
  UPDATE_MEMO_CHARACTER_BIRTHDAY: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/birthday`,
  UPDATE_MEMO_CHARACTER_IMAGE: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/image`,
  CREATE_MEMO_CHARACTER_CHARACTERISTIC: (memoCharacterId: string) => `/api/memos/characters/${memoCharacterId}/characteristic`,
  DELETE_MEMO_CHARACTER_CHARACTERISTIC: (memoCharacterId: string, characteristicId: string) => `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE: (memoCharacterId: string, characteristicId: string) => `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/title`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT: (memoCharacterId: string, characteristicId: string) => `/api/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/content`,
};
