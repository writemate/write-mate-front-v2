import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TMemo } from "./types";

export const getMemoList = async () => {
  const response = await axiosInstance.get<TMemo[]>(DOMAIN.GET_MEMO_LIST);
  return response.data;
};

export const createMemo = async () => {
  const response = await axiosInstance.post(DOMAIN.CREATE_MEMO);
  return response.data;
};

export const deleteMemo = async (id: string) => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO(id));
};

export const updaetMemoName = async ({
  id,
  memo_name,
}: {
  id: string;
  memo_name: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_NAME(id), { memo_name });
};

export const updateMemoDescription = async ({
  id,
  memo_description,
}: {
  id: string;
  memo_description: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_DESCRIPTION(id), {
    memo_description,
  });
};

export const getMemoCharacterList = async () => {
  const response = await axiosInstance.get<TMemo>(
    DOMAIN.GET_MEMO_CHARACTER_LIST
  );
  return response.data;
};
