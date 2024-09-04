import axiosInstance from "./axiosInstance";
import { getChapterListMock, getPlotFolderListMock } from "./mock/workspace";
import { TWork } from "./types";

export const getWork = (workId: string) => async () => {
  const response = await axiosInstance.get<TWork>(`/api/works/${workId}`);
  return response.data;
};

export const getPlotFolderList = getPlotFolderListMock;

export const getChapterList = getChapterListMock;

