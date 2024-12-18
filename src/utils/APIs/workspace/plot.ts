import { TPlot } from "../types";
import axiosInstance from "../axiosInstance";
import { DOMAIN } from "../domain";

export const getPlotInfo = (plotId: string) => async ()=> {
  const response = await axiosInstance.get<TPlot>(
    DOMAIN.GET_CHAPTER_LIST_WITH_EVENTS(plotId)
  );

  return response.data;
}

/**
 * 챕터 생성하기
 * @param plotId
 * @returns 챕터 id
 */
export const createChapter = (plotId: string) => async () => {
  const response = await axiosInstance.post<string>(
    DOMAIN.CREATE_CHAPTER(plotId)
  );

  return response.data;
};

/**
 * 챕터 삭제하기
 * @param plotId
 * @param chapterId
 * @returns
 */
export const deleteChapter = ( plotId: string, chapterId: string ) => async ( ) => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_CHAPTER(plotId, chapterId)
  );

  return response.data;
};

/**
 * 챕터 이름 수정하기
 * @param plotId
 * @param chapterId
 * @param chapter_name
 */
export const updateChapterName = ( plotId: string, chapterId: string ) => 
  async (chapter_name: string ) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_NAME(plotId, chapterId),
    { chapter_name }
  );

  return response.data;
};

/**
 * 챕터 설명 수정하기
 * @param plotId
 * @param chapterId
 * @param chapter_description
 */
export const updateChapterDescription = ( plotId: string, chapterId: string ) =>
  async (chapter_description: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_DESCRIPTION(plotId, chapterId),
    { chapter_description }
  );

  return response.data;
};

/**
 * 챕터 순서 수정하기
 * @param plotId
 * @param chapterId
 * @param pre_idx 현재 idx
 * @param next_idx 바꿀 idx
 */
export const updateChapterOrder = ( plotId: string) =>
  async ({ pre_idx, next_idx, chapterId }: { pre_idx: number; next_idx: number; chapterId: string }) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_ORDER(plotId, chapterId),
    { pre_idx, next_idx }
  );

  return response.data;
};

/**
 * 챕터 접힘 여부 수정하기
 * @param plotId
 * @param chapterId
 * @param is_folded
 */
export const updateChapterFoldAll = ( plotId: string ) =>
  async ( is_folded: boolean ) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_FOLD_All(plotId),
    { is_folded }
  );

  return response.data;
};

/**
 * 챕터 접힘 여부 수정하기
 * @param plotId
 * @param chapterId
 * @param is_folded
 */
export const updateChapterFoldForLocal = ( plotId: string, chapterId:string ) =>
  async (is_folded: boolean ) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_FOLD(plotId, chapterId),
    { is_folded }
  );

  return response.data;
};

/**
 * 사건 생성하기
 * @param chapterId
 * @returns id
 */
export const createEvent = (chapterId: string) => async () => {
  const response = await axiosInstance.post<TPlot>(DOMAIN.CREATE_EVENT(chapterId));

  return response.data;
};

/**
 * 사건 삭제하기
 * @param peventId
 * @returns
 */
export const deleteEvent = (chapterId: string, peventId: string) => async () => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_EVENT(chapterId, peventId)
  );

  return response.data;
};

/**
 * 사건 이름 수정하기
 * @param peventId
 * @param event_name
 */
export const updateEventName = (chapterId: string, peventId: string) =>
  async (event_name: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_NAME(chapterId, peventId),
    { event_name }
  );

  return response.data;
};

/**
 * 사건 설명 수정하기
 * @param pevntId
 * @param event_description
 */
export const updateEventDescription = (chapterId: string, peventId: string) =>
  async (event_description: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_DESCRIPTION(chapterId, peventId),
    { event_description }
  );

  return response.data;
};

/**
 * 사건 순서 수정하기
 * @param pevntId
 * @param pre_idx 현재 idx
 * @param next_idx 바꿀 idx
 */
export const updateEventOrder = (chapterId: string) => 
  async ({ pre_idx, next_idx, peventId }: { pre_idx: number; next_idx: number; peventId: string }) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_ORDER(chapterId, peventId),
    { pre_idx, next_idx }
  );

  return response.data;
};

/**
 * 사건에 인물 수동 할당하기
 */
export const addCharacter = (chapterId: string, peventId: string) =>
  async (characterId: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.ADD_EVENT_CHARACTER(chapterId, peventId, characterId)
  );

  return response.data;
};

/**
 * 사건에 인물 할당 해제하기
 */
export const deleteCharacter = (chapterId: string, peventId: string) =>
  async (characterId: string) => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_EVENT_CHARACTER(chapterId, peventId, characterId)
  );

  return response.data;
};
