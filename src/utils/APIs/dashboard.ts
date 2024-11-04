import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TWork } from "./types";
import { workspaceCategory } from "./types";

export const getWorkStudio =
  (
    category: (typeof workspaceCategory)[keyof typeof workspaceCategory] = "before"
  ) =>
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
