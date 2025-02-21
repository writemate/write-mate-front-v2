import axiosInstance from "./axiosInstance";
import { DOMAIN } from "./domain";
import { TMemo, TMCharacter } from "./types";

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

export const deleteMemo = (id: string) => async () => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO(id));
};

export const updateMemoName = (id: string) => async (memo_name: string) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_NAME(id), { memo_name });
};

export const updateMemoDescription =
  (id: string) => async (memo_description: string) => {
    await axiosInstance.patch(DOMAIN.UPDATE_MEMO_DESCRIPTION(id), {
      memo_description,
    });
  };

/*
 * 메모 캐릭터
 */
export const getMCharacter = (id: string) => async () => {
  const response = await axiosInstance.get<TMCharacter>(
    DOMAIN.GET_MEMO_CHARACTER(id)
  );
  return response.data;
};

export const getMCharacterList = async () => {
  const response = await axiosInstance.get<TMCharacter[]>(
    DOMAIN.GET_MEMO_CHARACTER_LIST
  );
  return response.data;
};

export const createMCharacter = async () => {
  const response = await axiosInstance.post(DOMAIN.CREATE_MEMO_CHARACTER);
  return response.data;
};

export const deleteMCharacter = (id: string) => async () => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO_CHARACTER(id));
};

export const updateMCharacterName = (id: string) => async (ch_name: string) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_NAME(id), { ch_name });
};

export const updateMCharacterImage = (id: string) => async (ch_image: File) => {
  const formData = new FormData();
  formData.append("file", ch_image);
  const response = await axiosInstance.patch(
    DOMAIN.UPDATE_MEMO_CHARACTER_IMAGE(id),
    formData
  );
  return response.data;
};

export const updateMCharacterDescription =
  (id: string) => async (description: string) => {
    await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_DESCRIPTION(id), {
      description,
    });
  };

export const updateMCharacterRole = (id: string) => async (role: string) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_ROLE(id), { role });
};

export const updateMCharacterGender =
  (id: string) => async (gender: string) => {
    await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_GENDER(id), {
      gender,
    });
  };

export const updateMCharacterBirthday =
  (id: string) => async (birthday: string) => {
    await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_BIRTHDAY(id), {
      birthday,
    });
  };

export const createMCharacterCharacteristic = (id: string) => async () => {
  await axiosInstance.patch(DOMAIN.CREATE_MEMO_CHARACTER_CHARACTERISTIC(id));
};

export const deleteMCharacterCharacteristic =
  (id: string) => async (idx: number) => {
    await axiosInstance.delete(
      DOMAIN.DELETE_MEMO_CHARACTER_CHARACTERISTIC(id),
      {
        params: { idx },
      }
    );
  };

export const updateMCharacterCharacteristicTitle =
  (id: string) =>
  async ({ index, title }: { index: number; title: string }) => {
    await axiosInstance.patch(
      DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE(id, index),
      { title }
    );
  };

export const updateMCharacterCharacteristicContent =
  (id: string) =>
  async ({ index, content }: { index: number; content: string }) => {
    await axiosInstance.patch(
      DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT(id, index),
      { content }
    );
  };
