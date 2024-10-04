import { TPlot } from "./types";
import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { responseGetPlotType } from "./mock/plot";

/**
 * 모든 플롯 가져오기
 * @param workId
 * @returns chapter[]
 */
export const getPlots = async (workId: string): Promise<TPlot[]> => {
  const response = await axiosInstance.get<TPlot[]>(DOMAIN.GET_PLOT(workId));

  return response.data;
};

/**
 * 챕터 생성하기
 * @param plotId
 * @param order
 * @returns chapter
 */
export const createPlot = async (
  plotId: string,
  order: number
): Promise<TPlot> => {
  const response = await axiosInstance.post<TPlot>(
    DOMAIN.CREATE_CHAPTER(plotId),
    {
      order: order,
    }
  );

  return response.data;
};

/**
 * 플롯 삭제하기
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
 * 플롯 수정하기
 * @param chapterId
 * @param plotId
 * @param plotName
 * @param plotDescription
 * @param order
 * @param nextOrder
 * @param isStared
 * @returns chapter
 */
export const updateChapter = async (
  chapterId: string,
  plotId: string,
  plotName?: string,
  plotDescription?: string,
  order?: number,
  nextOrder?: number,
  isStared?: boolean,
  isFolded?: boolean
): Promise<TPlot> => {
  const response = await axiosInstance.patch<TPlot>(
    DOMAIN.UPDATE_CHAPTER(plotId, chapterId),
    {
      plot_name: plotName,
      plot_description: plotDescription,
      order: order,
      next_order: nextOrder,
      is_starred: isStared,
      is_folded: isFolded,
    }
  );

  return response.data;
};

/**
 * 사건 생성하기
 * @param chapterId
 * @param order
 * @returns event
 */
export const createEvent = async (
  plotId: string,
  order: number
): Promise<TPlot> => {
  const response = await axiosInstance.post<TPlot>(
    DOMAIN.CREATE_EVENT(plotId),
    { order: order }
  );

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
 * 사건 수정하기
 * @param peventId
 * @param eventName
 * @param eventDescription
 * @param order
 * @returns event
 */
export const updateEvent = async (
  peventId: string,
  eventName?: string,
  eventDescription?: string,
  order?: number
): Promise<TPlot> => {
  const response = await axiosInstance.patch<TPlot>(
    DOMAIN.UPDATE_EVENT(peventId),
    {
      evnet_name: eventName,
      event_description: eventDescription,
      order: order,
    }
  );

  return response.data;
};
