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

export const updateMCharacterName = async ({
  id,
  ch_name,
}: {
  id: string;
  ch_name: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_NAME(id), { ch_name });
};

export const updateMCharacterImage = async ({
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

export const updateMCharacterDescription = async ({
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

export const updateMCharacterRole = async ({
  id,
  role,
}: {
  id: string;
  role: string;
}) => {
  await axiosInstance.patch(DOMAIN.UPDATE_MEMO_CHARACTER_ROLE(id), { role });
};

export const updateMCharacterGender = async ({
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

export const updateMCharacterBirthday = async ({
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

export const createMCharacterCharacteristic = async ({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) => {
  console.log({
    title,
    content,
  }); // 요청 데이터 확인
  await axiosInstance.patch(
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

export const deleteMCharacterCharacteristic = async ({
  id,
  idx,
}: {
  id: string;
  idx: number;
}) => {
  await axiosInstance.delete(DOMAIN.DELETE_MEMO_CHARACTER_CHARACTERISTIC(id), {
    params: { idx },
  });
};

export const updateMCharacterCharacteristicTitle = async ({
  id,
  idx,
  title,
}: {
  id: string;
  idx: number;
  title: string;
}) => {
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

export const updateMCharacterCharacteristicContent = async ({
  id,
  idx,
  content,
}: {
  id: string;
  idx: number;
  content: string;
}) => {
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
