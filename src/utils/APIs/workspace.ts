import axiosInstance from "./axiosInstance";
import {
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

import { TWorkInfo } from "./types";
import { TFolder, TScript, TWork } from "./types";
import { DOMAIN } from "./domain";

export const getWork = (workId: string) => async (): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(DOMAIN.GET_WORK(workId));
  return response.data;
};

export const getPlotFolderList = (workId: string) => async () => {
  const response = await axiosInstance.get<TFolder>(
    DOMAIN.GET_PLOT_LIST(workId)
  );
  return response.data;
};
export const updatePlotFolder = (workId: string) => async (folder: TFolder) => {
  const response = await axiosInstance.put<void>(
    DOMAIN.UPDATE_PLOT_LIST(workId),
    folder
  );
  return response.data;
};
export const createPlot = (workId: string) => async () => {
  const response = await axiosInstance.post<string>(DOMAIN.CREATE_PLOT(workId));
  return response.data;
};
export const updatePlotName = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_PLOT_NAME(id),
    { plot_name: name }
  );
  return response.data;
};
export const setMainPlot = async (plotId: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.SET_MAIN_PLOT(plotId)
  );
  return response.data;
};
export const deletePlot = async (plotId: string) => {
  const response = await axiosInstance.delete<void>(DOMAIN.DELETE_PLOT(plotId));
  return response.data;
};

export const getScriptFolderList = (workId: string) => async () => {
  const response = await axiosInstance.get<TFolder>(
    DOMAIN.GET_SCRIPT_LIST(workId)
  );
  return response.data;
};
export const updateScriptFolder =
  (workId: string) => async (folder: TFolder) => {
    const response = await axiosInstance.put<void>(
      DOMAIN.UPDATE_SCRIPT_LIST(workId),
      folder
    );
    return response.data;
  };
export const createScript = (workId: string) => async () => {
  const response = await axiosInstance.post<string>(
    DOMAIN.CREATE_SCRIPT(workId)
  );
  return response.data;
};
export const updateScriptName = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_SCRIPT_NAME(id),
    { script_name: name }
  );
  return response.data;
};
export const getScript = (scriptId: string) => async () => {
  const response = await axiosInstance.get<TScript>(
    DOMAIN.GET_SCRIPT(scriptId)
  );
  return response.data;
};
export const updateScriptContent =
  (scriptId: string) => async (content: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_SCRIPT_CONTENT(scriptId),
      { content }
    );
    return response.data;
  };

export const setMainScript = async (scriptId: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.SET_MAIN_SCRIPT(scriptId)
  );
  return response.data;
};
export const deleteScript = async (scriptId: string) => {
  const response = await axiosInstance.delete<void>(
    DOMAIN.DELETE_SCRIPT(scriptId)
  );
  return response.data;
};

export const getInfo = (workspace_id: string) => async () => {
  const response = await axiosInstance.get<TWorkInfo>(
    DOMAIN.GET_WORK(workspace_id)
  );
  return response.data;
};
export const updateCoverImage =
  (workId: string) => async (cover_image: File) => {
    const formData = new FormData();
    formData.append("file", cover_image);
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_WORK_COVER(workId),
      formData
    );
    return response.data;
  };
export const updateTitle = (workId: string) => async (title: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_WORK_TITLE(workId),
    { title }
  );
  return response.data;
};
export const updateGenre = (workId: string) => async (genre: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_WORK_GENRE(workId),
    { genre }
  );
  return response.data;
};
export const updateGrade = (workId: string) => async (grade: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_WORK_GRADE(workId),
    { grade }
  );
  return response.data;
};
export const updateLogline = (workId: string) => async (logline: string) => {
  const response = await axiosInstance.patch<void>(
    DOMAIN.UPDATE_WORK_LOGLINE(workId),
    { logline }
  );
  return response.data;
};
export const updateExpectedQuantity =
  (workId: string) => async (expected_quantity: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_WORK_QUANTITY(workId),
      { expected_quantity }
    );
    return response.data;
  };
export const updateIntroduction =
  (workId: string) => async (introduction: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_WORK_INTRODUCTION(workId),
      { introduction }
    );
    return response.data;
  };

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
