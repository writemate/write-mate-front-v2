import axiosInstance from "./axiosInstance";
import axios from "axios";
import { TUser } from "./types";

export const getUserInfoWithToken = async (token: string) => {
  const response = await axiosInstance.get<TUser>(`api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const signUp = async (token: string) => {
  await axios.post(`api/users/signin`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get<TUser>(`api/users`);
  return response.data;
};
