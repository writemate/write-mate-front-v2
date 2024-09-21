import axiosInstance from "./axiosInstance";
import {
  getChapterListMock,
  getPlotFolderListMock,
  updatePlotFolderMock,
} from "./mock/workspace";
import { TWork } from "./types";

export const getWork = async (workId: string): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(`/api/works/${workId}`);
  return response.data;
};

export const getPlotFolderList = getPlotFolderListMock;

export const getChapterList = getChapterListMock;

export const updatePlotFolder = updatePlotFolderMock;
