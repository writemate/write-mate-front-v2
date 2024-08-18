import axiosInstance from "./axiosInstance";
import { TWork } from "./types";

export const getWorkStudio = async () => {
  const response = await axiosInstance.get<TWork[]>("/api/works?category=before");
  return response.data;
};
