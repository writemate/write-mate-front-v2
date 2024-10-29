import axiosInstance from "./axiosInstance";
import axios from "axios";
import { TUser } from "./types";
import { DOMAIN } from "./domain";

export const getUserInfoWithToken = async (token: string) => {
  const response = await axiosInstance.get<TUser>(DOMAIN.GET_USER, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const signUp = async (token: string) => {
  await axios.post(DOMAIN.CREATE_USER, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get<TUser>(DOMAIN.GET_USER);
  return response.data;
};
