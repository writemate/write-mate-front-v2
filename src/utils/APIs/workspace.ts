import axiosInstance from "./axiosInstance";
import { TFolder, TScript, TWork, TWorkInfo, TSimplePlot, TSimpleScript } from "./types";
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

export const duplicatePlot = async (plotId: string) => {
  const response = await axiosInstance.post<TSimplePlot>(
    DOMAIN.DUPLICATE_PLOT(plotId)
  );
  return {id: response.data.id, name: response.data.plot_name};
}

export const duplicateScript = async (scriptId: string) => {
  const response = await axiosInstance.post<TSimpleScript>(
    DOMAIN.DUPLICATE_SCRIPT(scriptId)
  );
  return {id: response.data.id, name: response.data.script_name};
}
