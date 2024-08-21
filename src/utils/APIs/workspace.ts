import axiosInstance from "./axiosInstance";
import { TWork } from "./types";

export const getWork = async (workId: string): Promise<TWork> => {
  const response = await axiosInstance.get<TWork>(`/api/works/${workId}`);
  return response.data;
};
