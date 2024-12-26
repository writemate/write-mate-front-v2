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

export const deleteMemo = async (id: string) => {
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

export const deleteMCharacter = async (id: string) => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO_CHARACTER(id));
};

export const updateMCharacterName = (id: string) => async (ch_name: string) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_NAME(id), { ch_name });
};

export const updateMCharacterImage = (id: string) => async (ch_image: File) => {
  const formData = new FormData();
  formData.append("file", ch_image);
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_IMAGE(id), formData);
};

export const updateMCharacterDescription =
  (id: string) => async (ch_description: string) => {
    await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_DESCRIPTION(id), {
      ch_description,
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

export const createMCharacterCharacteristic =
  (id: string) => async (title: string, content: string) => {
    await axiosInstance.post(
      DOMAIN.CREATE_MEMO_CHARACTER_CHARACTERISTIC(id),
      {
        title,
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
  (id: string) => async (idx: number, title: string) => {
    await axiosInstance.patch(
      DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_TITLE(id),
      { title },
      {
        params: { idx },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

export const updateMCharacterCharacteristicContent =
  (id: string) => async (idx: number, content: string) => {
    await axiosInstance.patch(
      DOMAIN.UPDATE_MEMO_CHARACTER_CHARACTERISTIC_CONTENT(id),
      { content },
      {
        params: { idx },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
