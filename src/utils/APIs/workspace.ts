import axiosInstance from "./axiosInstance";
import { getChapterListMock, getPlotFolderListMock, updatePlotFolderMock,
  getInfoMock, removeKeywordMock, updateCoverImageMock, updateTitleMock,
  updateGenreMock, updateLoglineMock, updateExpectedQuantityMock, updateIntroductionMock, addKeywordMock
 } from "./mock/workspace";
import { TWork } from "./types";

export const getWork = (workId: string) => async () => {
  const response = await axiosInstance.get<TWork>(`/api/works/${workId}`);
  return response.data;
};

export const getPlotFolderList = getPlotFolderListMock;
export const getChapterList = getChapterListMock;
export const updatePlotFolder = updatePlotFolderMock;

export const getInfo = getInfoMock;
export const updateCoverImage = updateCoverImageMock;
export const updateTitle = updateTitleMock;
export const updateGenre = updateGenreMock;
export const updateLogline = updateLoglineMock;
export const updateExpectedQuantity = updateExpectedQuantityMock;
export const updateIntroduction = updateIntroductionMock;
export const addKeyword = addKeywordMock;
export const removeKeyword = removeKeywordMock;

