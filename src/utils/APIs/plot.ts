import { TPlot } from "./types";
import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { PlotCharacterType } from "./mock/plot";

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
export const deleteChapter = ( plotId: string ) => async ( chapterId: string) => {
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
export const updateChapterName = ( plotId: string ) => 
  async ({ chapterId, chapter_name }: { chapterId: string; chapter_name: string }) => {
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
export const updateChapterDescription = ( plotId: string ) =>
  async ({chapterId, chapter_description}: {chapterId: string, chapter_description: string}) => {
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
export const updateChapterFold = ( plotId: string ) =>
  async ({ chapterId, is_folded }: { chapterId: string; is_folded: boolean }) => {
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
export const createEvent = async (plotId: string): Promise<TPlot> => {
  const response = await axiosInstance.post<TPlot>(DOMAIN.CREATE_EVENT(plotId));

  return response.data;
};

/**
 * 사건 삭제하기
 * @param peventId
 * @returns
 */
export const deleteEvent = async (peventId: string): Promise<void> => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_EVENT(peventId)
  );

  return response.data;
};

/**
 * 사건 이름 수정하기
 * @param peventId
 * @param event_name
 */
export const updateEventName = async (
  peventId: string,
  event_name: string
): Promise<void> => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_NAME(peventId),
    { event_name }
  );

  return response.data;
};

/**
 * 사건 설명 수정하기
 * @param pevntId
 * @param event_description
 */
export const updateEventDescription = async (
  peventId: string,
  event_description: string
): Promise<void> => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_DESCRIPTION(peventId),
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
export const updateEventOrder = async (
  pevntId: string,
  pre_idx: number,
  next_idx: number
): Promise<void> => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_EVENT_ORDER(pevntId),
    { pre_idx, next_idx }
  );

  return response.data;
};

/**
 * 사건에 인물 수동 할당하기
 */
export const addCharacter = async (
  peventId: string,
  characterId: string
): Promise<PlotCharacterType> => {
  const response = await axiosInstance.patch<PlotCharacterType>(
    DOMAIN.ADD_EVENT_CHARACTER(peventId, characterId)
  );

  return response.data;
};

/**
 * 사건에 인물 할당 해제하기
 */
export const deleteCharacter = async (
  peventId: string,
  characterId: string
): Promise<void> => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_EVENT_CHARACTER(peventId, characterId)
  );

  return response.data;
};
