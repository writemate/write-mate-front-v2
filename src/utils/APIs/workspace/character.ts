import { TCharacter, TKeyword, TRelation } from "../types";
import axiosInstance from "../axiosInstance";
import { DOMAIN } from "../domain";

//캐릭터 리스트 페이지에서 쓰임
export const getCharacterList = (workspaceId: string) => async () => {
  const response = await axiosInstance.get<TCharacter[]>(
    DOMAIN.GET_CHARACTER_LIST(workspaceId)
  );
  return response.data;
};
export const createCharacter = (workspaceId: string) => async () => {
  const response = await axiosInstance.post<string>(
    DOMAIN.CREATE_CHARACTER(workspaceId)
  );
  return response.data;
};
export const setMainCharacter =
  (workspaceId: string) => async (characterId: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_MAIN(workspaceId, characterId)
    );
    return response.data;
  };
export const unsetMainCharacter =
  (workspaceId: string) => async (characterId: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_MAIN(workspaceId, characterId)
    );
    return response.data;
  };

export const getKeywordList = (workspaceId: string) => async () => {
  const response = await axiosInstance.get<TKeyword[]>(
    DOMAIN.GET_KEYWORD_LIST(workspaceId)
  );
  return response.data;
};
export const createKeyword =
  (workspaceId: string) =>
  async ({ word, color }: { word: string; color?: string }) => {
    const response = await axiosInstance.post<string>(
      DOMAIN.CREATE_KEYWORD(workspaceId),
      { word, color }
    );
    return response.data;
  };
export const deleteKeyword =
  (workspaceId: string) => async (keywordId: string) => {
    const response = await axiosInstance.delete<void>(
      DOMAIN.DELETE_KEYWORD(workspaceId, keywordId)
    );
    return response.data;
  };
export const addKeywordToCharacter =
  (workspaceId: string, characterId: string) => async (keywordId: string) => {
    const response = await axiosInstance.post<void>(
      DOMAIN.ADD_CHARACTER_KEYWORD(workspaceId, characterId, keywordId)
    );
    return response.data;
  };
export const removeKeywordFromCharacter =
  (workspaceId: string, characterId: string) => async (keywordId: string) => {
    const response = await axiosInstance.delete<void>(
      DOMAIN.DELETE_CHARACTER_KEYWORD(workspaceId, characterId, keywordId)
    );
    return response.data;
  };

export const getRelationList = (workspaceId: string) => async () => {
  const response = await axiosInstance.get<TRelation[]>(
    DOMAIN.GET_RELATION_LIST(workspaceId)
  );
  return response.data;
};
export const createCharacterRelation =
  (workspaceId: string) =>
  async ({
    character1Id,
    character2Id,
    relation1to2,
    relation2to1,
  }: {
    character1Id: string;
    character2Id: string;
    relation1to2: string;
    relation2to1: string;
  }) => {
    const response = await axiosInstance.post<void>(
      DOMAIN.CREATE_RELATION(workspaceId),
      {
        start_ch: character1Id,
        end_ch: character2Id,
        arrow_text_right: relation1to2,
        arrow_text_left: relation2to1,
      }
    );
    return response.data;
  };

export const deleteCharacterRelation =
  (workspaceId: string) => async (relationId: string) => {
    const response = await axiosInstance.delete<void>(
      DOMAIN.DELETE_RELATION(workspaceId, relationId)
    );
    return response.data;
  };
export const updateCharacterRelation =
  (workspaceId: string) =>
  async ({
    relationId,
    relation1to2,
    relation2to1,
  }: {
    relationId: string;
    relation1to2: string;
    relation2to1: string;
  }) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_RELATION(workspaceId, relationId),
      { arrow_text_right: relation1to2, arrow_text_left: relation2to1 }
    );
    return response.data;
  };

//캐릭터 상세 페이지에서 쓰임
export const getCharacter =
  (workspaceId: string, characterId: string) => async () => {
    const response = await axiosInstance.get<TCharacter>(
      DOMAIN.GET_CHARACTER_DETAIL(workspaceId, characterId)
    );
    return response.data;
  };
export const deleteCharacter =
  (workspaceId: string, characterId: string) => async () => {
    const response = await axiosInstance.delete<void>(
      DOMAIN.DELETE_CHARACTER(workspaceId, characterId)
    );
    return response.data;
  };
export const updateCharacterName =
  (workspaceId: string, characterId: string) => async (ch_name: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_NAME(workspaceId, characterId),
      { ch_name }
    );
    return response.data;
  };
export const updateCharacterRole =
  (workspaceId: string, characterId: string) => async (role: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_ROLE(workspaceId, characterId),
      { role }
    );
    return response.data;
  };
export const updateCharacterGender =
  (workspaceId: string, characterId: string) => async (gender: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_GENDER(workspaceId, characterId),
      { gender }
    );
    return response.data;
  };
export const updateCharacterBirthday =
  (workspaceId: string, characterId: string) => async (birthday: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_BIRTHDAY(workspaceId, characterId),
      { birthday }
    );
    return response.data;
  };
export const updateCharacterDescription =
  (workspaceId: string, characterId: string) => async (description: string) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_DESCRIPTION(workspaceId, characterId),
      { description }
    );
    return response.data;
  };
export const updateCharacterCoverImage =
  (workspaceId: string, characterId: string) => async (ch_image: File) => {
    const formData = new FormData();
    formData.append("file", ch_image);
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_IMAGE(workspaceId, characterId),
      formData
    );
    return response.data;
  };

export const addCharacterCharacteristic =
  (workspaceId: string, characterId: string) => async () => {
    const response = await axiosInstance.post<void>(
      DOMAIN.ADD_CHARACTER_CHARACTERISTIC(workspaceId, characterId)
    );
    return response.data;
  };

export const updateCharacterCharacteristicTitle =
  (workspaceId: string, characterId: string) =>
  async ({ index, title }: { index: number; title: string }) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_CHARACTERISTIC_TITLE(
        workspaceId,
        characterId,
        index
      ),
      { title }
    );
    return response.data;
  };
export const updateCharacterCharacteristicContent =
  (workspaceId: string, characterId: string) =>
  async ({ index, content }: { index: number; content: string }) => {
    const response = await axiosInstance.patch<void>(
      DOMAIN.UPDATE_CHARACTER_CHARACTERISTIC_CONTENT(
        workspaceId,
        characterId,
        index
      ),
      { content }
    );
    return response.data;
  };
export const removeCharacterCharacteristic =
  (workspaceId: string, characterId: string) => async (index: number) => {
    const response = await axiosInstance.delete<void>(
      DOMAIN.DELETE_CHARACTER_CHARACTERISTIC(workspaceId, characterId, index)
    );
    return response.data;
  };
