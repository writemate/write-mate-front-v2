import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TMemo, TMemoCharacter } from "./types";

/*
 * 메모
 */
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

/*
 * 메모 캐릭터
 */

export const getMemoCharacterList = async () => {
  const response = await axiosInstance.get<TMemoCharacter[]>(
    DOMAIN.GET_MEMO_CHARACTER_LIST
  );
  return response.data;
};

export const createMemoCharacter = async () => {
  const response = await axiosInstance.post(DOMAIN.CREATE_MEMO_CHARACTER);
  return response.data;
};

export const deleteMemoCharacter = async (id: string) => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO_CHARACTER(id));
};

export const updateMemoCharacterName = async ({
  id,
  ch_name,
}: {
  id: string;
  ch_name: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_NAME(id), { ch_name });
};

export const updateMemoCharacterImage = async ({
  id,
  ch_image,
}: {
  id: string;
  ch_image: File;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_IMAGE(id), {
    ch_image,
  });
};

export const updateMemoCharacterDescription = async ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_DESCRIPTION(id), {
    description,
  });
};

export const updateMemoCharacterRole = async ({
  id,
  role,
}: {
  id: string;
  role: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_ROLE(id), { role });
};

export const updateMemoCharacterGender = async ({
  id,
  gender,
}: {
  id: string;
  gender: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_GENDER(id), {
    gender,
  });
};

export const updateMemoCharacterBirthday = async ({
  id,
  birthday,
}: {
  id: string;
  birthday: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_BIRTHDAY(id), {
    birthday,
  });
};

export const createMemoCharacterCharacteristic = async ({
  id,
  characteristic,
}: {
  id: string;
  characteristic: Array<{ title: string; content: string }>;
}) => {
  await axiosInstance.patch(DOMAIN.CREATE_MEMO_CHARACTER_CHARACTERISTIC(id), {
    characteristic,
  });
};

export const deleteMemoCharacterCharacteristic = async ({
  id,
  characteristicId,
}: {
  id: string;
  characteristicId: string;
}) => {
  await axiosInstance.delete(
    DOMAIN.DELETE_MEMO_CHARACTER_CHARACTERISTIC(id, characteristicId)
  );
};

export const updateMemoCharacterCharacteristicTitle = async ({
  id,
  characteristicId,
  title,
}: {
  id: string;
  characteristicId: string;
  title: string;
}) => {
  await axiosInstance.patch(
    DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE(id, characteristicId),
    { title }
  );
};

export const updateMemoCharacterCharacteristicContent = async ({
  id,
  characteristicId,
  content,
}: {
  id: string;
  characteristicId: string;
  content: string;
}) => {
  await axiosInstance.patch(
    DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT(id, characteristicId),
    { content }
  );
};
