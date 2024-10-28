import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TMemo } from "./types";

export const getMemoList = async () => {
  const response = await axiosInstance.get<TMemo[]>(DOMAIN.GET_MEMO_LIST);
  return response.data;
};

export const createMemo = async () => {
  await axiosInstance.post(DOMAIN.CREATE_MEMO);
};

export const deleteMemo = (id: string) => async () => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO(id));
};

export const updaetMemoName = (id: string) => async (memo_name: string) => {
  await axiosInstance.put(DOMAIN.UPDATE_MEMO_NAME(id), { memo_name });
};

export const updateMemoDescription = (id: string) => async (memo_description: string) => {
  await axiosInstance.put(DOMAIN.UPDATE_MEMO_DESCRIPTION(id), { memo_description });
}

export const getMemoCharacterList = async () => {
  const response = await axiosInstance.get<TMemo>(DOMAIN.GET_MEMO_CHARACTER_LIST);
  return response.data;
}
