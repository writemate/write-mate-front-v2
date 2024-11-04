import { TPlot } from "./types";
import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import {
  PlotChapterType,
  PlotCharacterType,
  responseGetPlotType,
} from "./mock/plot";

/**
 * 모든 플롯 가져오기
 * @param workId
 * @returns chapter[]
 */
export const getPlots = async (
  workId: string
): Promise<responseGetPlotType> => {
  const response = await axiosInstance.get<responseGetPlotType>(
    DOMAIN.GET_PLOT(workId)
  );

  return response.data;
};

/**
 * 챕터 생성하기
 * @param plotId
 * @returns 챕터 id
 */
export const createChapter = async (plotId: string): Promise<string> => {
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
export const deleteChapter = async (
  plotId: string,
  chapterId: string
): Promise<void> => {
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
export const updateChapterName = async (
  plotId: string,
  chapterId: string,
  chapter_name: string
): Promise<void> => {
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
export const updateChapterDescription = async (
  plotId: string,
  chapterId: string,
  chapter_description: string
): Promise<void> => {
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
export const updateChapterOrder = async (
  plotId: string,
  chapterId: string,
  pre_idx: number,
  next_idx: number
): Promise<void> => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_ORDER_FOLD(plotId, chapterId),
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
export const updateChapterFold = async (
  plotId: string,
  chapterId: string,
  is_folded: boolean
): Promise<void> => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_CHAPTER_ORDER_FOLD(plotId, chapterId),
    { is_folded }
  );

  return response.data;
};

/**
 * 사건 생성하기
 * @param chapterId
 * @returns id
 */
export const createEvent = async (
  plotId: string,
  order: number
): Promise<TPlot> => {
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
    DOMAIN.UPDATE_EVENT_CHARACTER(peventId, characterId)
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
    DOMAIN.UPDATE_EVENT_CHARACTER(peventId, characterId)
  );

  return response.data;
};
