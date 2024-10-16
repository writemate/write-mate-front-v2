import axiosInstance from "./axiosInstance";
import { getChapterListMock, getPlotFolderListMock, updatePlotFolderMock,
  getInfoMock, updateCoverImageMock, updateTitleMock,
  updateGenreMock, updateLoglineMock, updateExpectedQuantityMock, updateIntroductionMock,
  updateGradeMock, createPlotMock, getScriptFolderListMock, updateScriptFolderMock, createScriptMock,
  getCharacterListMock, getCharacterKeywordListMock, createCharacterKeywordMock, createCharacterMock,
  updateCharacterNameMock, updateCharacterRoleMock, updateCharacterGenderMock,
  updateCharacterBirthdayMock, addCharacterKeywordMock, removeCharacterKeywordMock,
  addCharacterCharacteristicMock, updateCharacterCharacteristicTitleMock,
  updateCharacterCharacteristicContentMock, removeCharacterCharacteristicMock,
  setMainCharacterMock, removeMainCharacterMock, updateCharacterCoverImageMock,
  getCharacterMock, updateCharacterDescriptionMock, deleteCharacterMock,
  deleteCharacterKeywordMock, getCharacterRelationMock, createCharacterRelationMock, deleteCharacterRelationMock, updateCharacterRelationMock
 } from "./mock/workspace";
import { TWork } from "./types";

export const getWork = (workId: string) => async () => {
  const response = await axiosInstance.get<TWork>(`/api/works/${workId}`);
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
export const updateCharacterCharacteristicTitle = updateCharacterCharacteristicTitleMock;
export const updateCharacterCharacteristicContent = updateCharacterCharacteristicContentMock;
export const removeCharacterCharacteristic = removeCharacterCharacteristicMock;

export const getCharacterRelation = getCharacterRelationMock;
export const createCharacterRelation = createCharacterRelationMock;
export const deleteCharacterRelation = deleteCharacterRelationMock;
export const updateCharacterRelation = updateCharacterRelationMock;
