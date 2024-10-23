import { workspaceCategory } from "./types";

export const DOMAIN = {
  GET_WORKLIST: (category: typeof workspaceCategory[keyof typeof workspaceCategory]) => `/api/works?category=${category}`,
  CREATE_WORK: "/api/works",
  GET_WORK: (workId: string) => `/api/works/${workId}`,

  GET_PLOT: (workId: string) => `/api/works/${workId}/plots`,

  CREATE_CHAPTER: (plotId: string) => `/api/plots/${plotId}/plots`,
  DELETE_CHAPTER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}`,
  UPDATE_CHAPTER: (plotId: string, chapterId: string) =>
    `/api/plots/${plotId}/chapters/${chapterId}`,

  CREATE_EVENT: (chapterId: string) => `/api/chapters/${chapterId}/pevents`,
  DELETE_EVENT: (peventId: string) => `/api/pevents/${peventId}`,
  UPDATE_EVENT: (peventId: string) => `/api/pevents/${peventId}`,

  GET_MEMO_LIST: `/api/works/memos`,
  CREATE_MEMO: `/api/works/memos`,
  DELETE_MEMO: (memoId: string) => `/api/works/memos/${memoId}`,
  UPDATE_MEMO_NAME: (memoId: string) => `/api/works/memos/${memoId}/name`,
  UPDATE_MEMO_DESCRIPTION: (memoId: string) => `/api/works/memos/${memoId}/description`,

  GET_MEMO_CHARACTER_LIST: `/api/works/memos/characters`,
  CREATE_MEMO_CHARACTER: `/api/works/memos/characters`,
  DELETE_MEMO_CHARACTER: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}`,
  UPDATE_MEMO_CHARACTER_NAME: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/name`,
  UPDATE_MEMO_CHARACTER_ROLE: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/role`,
  UPDATE_MEMO_CHARACTER_GENDER: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/gender`,
  UPDATE_MEMO_CHARACTER_DESCRIPTION: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/description`,
  UPDATE_MEMO_CHARACTER_BIRTHDAY: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/birthday`,
  UPDATE_MEMO_CHARACTER_IMAGE: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/image`,
  CREATE_MEMO_CHARACTER_CHARACTERISTIC: (memoCharacterId: string) => `/api/works/memos/characters/${memoCharacterId}/characteristic`,
  DELETE_MEMO_CHARACTER_CHARACTERISTIC: (memoCharacterId: string, characteristicId: string) => `/api/works/memos/characters/${memoCharacterId}/characteristic/${characteristicId}`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE: (memoCharacterId: string, characteristicId: string) => `/api/works/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/title`,
  UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT: (memoCharacterId: string, characteristicId: string) => `/api/works/memos/characters/${memoCharacterId}/characteristic/${characteristicId}/content`,
};
