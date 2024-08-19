import axiosInstance from "./axiosInstance";
import { TWork } from "./types";

export const getWorkStudio = async () => {
  const response = await axiosInstance.get<TWork[]>("/api/works?category=before");
  return response.data;
};

export const addWorkStudio = async () => {
  const response = await axiosInstance.post("/api/works", undefined);
  return response.data;
};
