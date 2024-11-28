import axiosInstance from "./axiosInstance";
import {
  getChapterListMock,
  getPlotFolderListMock,
  updatePlotFolderMock,
  getInfoMock,
  updateCoverImageMock,
  updateTitleMock,
  updateGenreMock,
  updateLoglineMock,
  updateExpectedQuantityMock,
  updateIntroductionMock,
  updateGradeMock,
  createPlotMock,
  getScriptFolderListMock,
  updateScriptFolderMock,
  createScriptMock,
  getCharacterListMock,
  getCharacterKeywordListMock,
  createCharacterKeywordMock,
  createCharacterMock,
  updateCharacterNameMock,
  updateCharacterRoleMock,
  updateCharacterGenderMock,
  updateCharacterBirthdayMock,
  addCharacterKeywordMock,
  removeCharacterKeywordMock,
  addCharacterCharacteristicMock,
  updateCharacterCharacteristicTitleMock,
  updateCharacterCharacteristicContentMock,
  removeCharacterCharacteristicMock,
  setMainCharacterMock,
  removeMainCharacterMock,
  updateCharacterCoverImageMock,
  getCharacterMock,
  updateCharacterDescriptionMock,
  deleteCharacterMock,
  deleteCharacterKeywordMock,
  getCharacterRelationMock,
  createCharacterRelationMock,
  deleteCharacterRelationMock,
  updateCharacterRelationMock,
} from "./mock/workspace";
import { TFolder, TWork } from "./types";
import { DOMAIN } from "./domain";

export const getWork = (workId: string) => async (): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(DOMAIN.GET_WORK(workId));
  return response.data;
};

export const getPlotFolderList = (workId: string) => async () => {
  const response = await axiosInstance.get<TFolder>(DOMAIN.GET_PLOT_LIST(workId));
  return response.data;
}
export const updatePlotFolder = (workId: string) => async (folder: TFolder) => {
  const response = await axiosInstance.put<void>(DOMAIN.UPDATE_PLOT_LIST(workId), folder);
  return response.data;
}
export const createPlot = (workId: string) => async () => {
  const response = await axiosInstance.post<string>(DOMAIN.CREATE_PLOT(workId));
  return response.data;
}

export const getScriptFolderList = (workId: string) => async () => {
  const response = await axiosInstance.get<TFolder>(DOMAIN.GET_SCRIPT_LIST(workId));
  return response.data;
}
export const updateScriptFolder = (workId: string) => async (folder: TFolder) => {
  const response = await axiosInstance.put<void>(DOMAIN.UPDATE_SCRIPT_LIST(workId), folder);
  return response.data;
}
export const createScript = (workId: string) => async () => {
  const response = await axiosInstance.post<string>(DOMAIN.CREATE_SCRIPT(workId));
  return response.data;
}

export const getInfo = getInfoMock;
export const updateCoverImage = updateCoverImageMock;
export const updateTitle = updateTitleMock;
export const updateGenre = updateGenreMock;
export const updateGrade = updateGradeMock;
export const updateLogline = updateLoglineMock;
export const updateExpectedQuantity = updateExpectedQuantityMock;
export const updateIntroduction = updateIntroductionMock;

//캐릭터 리스트 페이지에서 쓰임
export const getCharacterList = getCharacterListMock;
export const createCharacter = createCharacterMock;
export const setMainCharacter = setMainCharacterMock;
export const removeMainCharacter = removeMainCharacterMock; //unsetMainCharacter라고 이름 바꿔야할듯

export const getCharacterKeywordList = getCharacterKeywordListMock;
export const createCharacterKeyword = createCharacterKeywordMock;
export const deleteCharacterKeyword = deleteCharacterKeywordMock;
export const addCharacterKeyword = addCharacterKeywordMock;
export const removeCharacterKeyword = removeCharacterKeywordMock;

//캐릭터 상세 페이지에서 쓰임
export const getCharacter = getCharacterMock;
export const deleteCharacter = deleteCharacterMock;
export const updateCharacterName = updateCharacterNameMock;
export const updateCharacterRole = updateCharacterRoleMock;
export const updateCharacterGender = updateCharacterGenderMock;
export const updateCharacterBirthday = updateCharacterBirthdayMock;
export const updateCharacterDescription = updateCharacterDescriptionMock;
export const updateCharacterCoverImage = updateCharacterCoverImageMock;

export const addCharacterCharacteristic = addCharacterCharacteristicMock;
export const updateCharacterCharacteristicTitle =
  updateCharacterCharacteristicTitleMock;
export const updateCharacterCharacteristicContent =
  updateCharacterCharacteristicContentMock;
export const removeCharacterCharacteristic = removeCharacterCharacteristicMock;

export const getCharacterRelation = getCharacterRelationMock;
export const createCharacterRelation = createCharacterRelationMock;
export const deleteCharacterRelation = deleteCharacterRelationMock;
export const updateCharacterRelation = updateCharacterRelationMock;
