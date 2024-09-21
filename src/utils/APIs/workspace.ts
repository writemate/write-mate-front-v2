import axiosInstance from "./axiosInstance";
import {
  getChapterListMock,
  getPlotFolderListMock,
  updatePlotFolderMock,
} from "./mock/workspace";
import { TWork } from "./types";
import { DOMAIN } from "./domain";

export const getWork = async (workId: string): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(DOMAIN.GET_WORK(workId));
  return response.data;
};

export const getPlotFolderList = getPlotFolderListMock;

export const getChapterList = getChapterListMock;

export const updatePlotFolder = updatePlotFolderMock;
