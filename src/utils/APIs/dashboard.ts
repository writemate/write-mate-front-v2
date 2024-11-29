import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TWork } from "./types";
import { workspaceCategory } from "./types";

export const getWorkStudio =
  (category: (typeof workspaceCategory)[keyof typeof workspaceCategory]) =>
  async () => {
    const response = await axiosInstance.get<TWork[]>(
      DOMAIN.GET_WORKLIST(category)
    );
    return response.data;
  };

export const addWorkStudio = async () => {
  const response = await axiosInstance.post(DOMAIN.CREATE_WORK);
  return response.data;
};

export const updateWorkTitle = (workId: string) => async (title: string) => {
  const response = await axiosInstance.patch(DOMAIN.UPDATE_WORK_TITLE(workId), {
    title,
  });
  return response.data;
};

export const updateWorkCover = (workId: string) => async (file: File) => {
  await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const response = await axiosInstance.patch(
        DOMAIN.UPDATE_WORK_COVER(workId),
        {
          cover: e.target?.result as string,
        }
      );
      return response.data;
    };
    resolve(null);
  });
};

export const updateWorkCategory =
  (workId: string) => async (category: keyof typeof workspaceCategory) => {
    const response = await axiosInstance.patch(
      DOMAIN.UPDATE_WORK_CATEGORY(workId),
      {
        category,
      }
    );
    return response.data;
  };

export const deleteWork = async (workId: string) => {
  const response = await axiosInstance.delete(DOMAIN.DELETE_WORK(workId));
  return response.data;
};

export const getMemo = async () => {
  const response = await axiosInstance.get(DOMAIN.GET_MEMO_LIST);
  return response.data;
};
