import axiosInstance from "./axiosInstance";
import { TUser } from "./types";

export const getUserInfo = async () => {
  const response = await axiosInstance.get<TUser>(`api/users`);
  return response.data;
};
