import axiosInstance from "./axiosInstance";
import { getChapterListMock, getPlotFolderListMock, updatePlotFolderMock,
  getInfoMock, removeKeywordMock, updateCoverImageMock, updateTitleMock,
  updateGenreMock, updateLoglineMock, updateExpectedQuantityMock, updateIntroductionMock, addKeywordMock,
  updateGradeMock, createPlotMock, getScriptFolderListMock, updateScriptFolderMock, createScriptMock,
  getCharacterListMock, getCharacterKeywordListMock, createCharacterKeywordMock, createCharacterMock,
  updateCharacterNameMock, updateCharacterRoleMock, updateCharacterGenderMock,
  updateCharacterBirthdayMock, addCharacterKeywordMock, removeCharacterKeywordMock,
  addCharacterCharacteristicMock, updateCharacterCharacteristicTitleMock,
  updateCharacterCharacteristicContentMock, removeCharacterCharacteristicMock,
  setMainCharacterMock, removeMainCharacterMock, updateCharacterCoverImageMock,
  getCharacterMock, updateCharacterDescriptionMock, deleteCharacterMock
 } from "./mock/workspace";
import { TWork } from "./types";
import { DOMAIN } from "./domain";

export const getWork = (workId: string) => async (): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(DOMAIN.GET_WORK(workId));
  return response.data;
};

export const getPlotFolderList = getPlotFolderListMock;
export const getChapterList = getChapterListMock;
export const updatePlotFolder = updatePlotFolderMock;
export const createPlot = createPlotMock;

export const getScriptFolderList = getScriptFolderListMock;
export const updateScriptFolder = updateScriptFolderMock;
export const createScript = createScriptMock;

export const getInfo = getInfoMock;
export const updateCoverImage = updateCoverImageMock;
export const updateTitle = updateTitleMock;
export const updateGenre = updateGenreMock;
export const updateGrade = updateGradeMock;
export const updateLogline = updateLoglineMock;
export const updateExpectedQuantity = updateExpectedQuantityMock;
export const updateIntroduction = updateIntroductionMock;
export const addKeyword = addKeywordMock;
export const removeKeyword = removeKeywordMock;

export const getCharacterList = getCharacterListMock;
export const getCharacterKeywordList = getCharacterKeywordListMock;
export const createCharacterKeyword = createCharacterKeywordMock;
export const createCharacter = createCharacterMock;
export const setMainCharacter = setMainCharacterMock;
export const removeMainCharacter = removeMainCharacterMock;

export const getCharacter = getCharacterMock;
export const updateCharacterName = updateCharacterNameMock;
export const updateCharacterRole = updateCharacterRoleMock;
export const updateCharacterGender = updateCharacterGenderMock;
export const updateCharacterBirthday = updateCharacterBirthdayMock;
export const updateCharacterDescription = updateCharacterDescriptionMock;
export const addCharacterKeyword = addCharacterKeywordMock;
export const removeCharacterKeyword = removeCharacterKeywordMock;
export const updateCharacterCoverImage = updateCharacterCoverImageMock;
export const addCharacterCharacteristic = addCharacterCharacteristicMock;
export const updateCharacterCharacteristicTitle = updateCharacterCharacteristicTitleMock;
export const updateCharacterCharacteristicContent = updateCharacterCharacteristicContentMock;
export const removeCharacterCharacteristic = removeCharacterCharacteristicMock;
export const deleteCharacter = deleteCharacterMock;
