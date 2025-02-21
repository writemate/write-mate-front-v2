import { useQuery, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import {
  getCharacter,
  updateCharacterName,
  updateCharacterRole,
  updateCharacterGender,
  updateCharacterBirthday,
  updateCharacterCoverImage,
  addCharacterCharacteristic,
  updateCharacterCharacteristicTitle,
  removeCharacterCharacteristic,
  updateCharacterCharacteristicContent,
  updateCharacterDescription,
  deleteCharacter,
} from "@/utils/APIs/workspace/character";
import { useParams, useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { TCharacter } from "@/utils/APIs/types";
import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";

export function useCharacter(characterId?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams<{ workspace_id: string; character_id: string }>();
  const workspace_id = params.workspace_id;
  const character_id = characterId ?? params.character_id;
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    queryFn: getCharacter(workspace_id, character_id),
  });

  const onClickDeleteCharacter = useOnClickUpdate({
    mutationFn: deleteCharacter(workspace_id, character_id),
    queryKey: workspaceQueryKeys.character(workspace_id),
    savingMessage: "캐릭터 삭제 중",
    errorMessage: "캐릭터 삭제에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterList(workspace_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        (prev: any) => prev.filter((c: any) => c.id !== character_id)
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterList(workspace_id),
        context?.prevData
      );
    },
    onSuccess: () => {
      router.push(`/${workspace_id}/character`);
    },
  })();

  const onChangeName = useInputLiveUpdate(
    updateCharacterName(workspace_id, character_id),
    "캐릭터 이름 변경",
    "캐릭터 이름 변경에 실패했습니다."
  );
  const onChangeRole = useInputLiveUpdate(
    updateCharacterRole(workspace_id, character_id),
    "역할 변경",
    "역할 변경에 실패했습니다."
  );
  const onChangeGender = useInputLiveUpdate(
    updateCharacterGender(workspace_id, character_id),
    "성별 변경",
    "성별 변경에 실패했습니다."
  );
  const onChangeBirthday = useInputLiveUpdate(
    updateCharacterBirthday(workspace_id, character_id),
    "생일 변경",
    "생일 변경에 실패했습니다."
  );
  const onChangeDescription = useInputLiveUpdate(
    updateCharacterDescription(workspace_id, character_id),
    "설명 변경",
    "설명 변경에 실패했습니다."
  );

  const [characteristicList, setCharacteristicList] = useState<
    TCharacter["characteristic"]
  >([]);

  useEffect(() => {
    if (data) {
      setCharacteristicList(data.characteristic);
    }
  }, [data]);

  const onClickAddCharacteristic = useOnClickUpdate({
    mutationFn: addCharacterCharacteristic(workspace_id, character_id),
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    savingMessage: "캐릭터에 특징 추가 중",
    errorMessage: "캐릭터 특징 추가에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id)
      );
      if (!prevData) return;
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        (prev: any) => {
          return {
            ...prev,
            characteristic: [...characteristicList, { title: "", content: "" }],
          };
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        context?.prevData
      );
    },
  })();

  const onClickRemoveCharacteristic = useOnClickUpdate({
    mutationFn: removeCharacterCharacteristic(workspace_id, character_id),
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    savingMessage: "캐릭터에서 특징 삭제 중",
    errorMessage: "캐릭터 특징 삭제에 실패했습니다.",
    onMutate: (index: number) => {
      const prevData = queryClient.getQueryData<TCharacter>(
        workspaceQueryKeys.characterDetail(workspace_id, character_id)
      );
      if (!prevData) return;
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        {
          ...prevData,
          characteristic: characteristicList.filter((_, i) => i !== index),
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        context?.prevData
      );
    },
  });

  const onChangeCharacteristicTitle = useInputLiveUpdate(
    updateCharacterCharacteristicTitle(workspace_id, character_id),
    "특징 제목 변경",
    "특징 제목 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, title: value } : c))
      ),
    (value, index) => ({ index, title: value })
  );

  const onChangeCharacteristicContent = useInputLiveUpdate(
    updateCharacterCharacteristicContent(workspace_id, character_id),
    "특징 내용 변경",
    "특징 내용 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, content: value } : c))
      ),
    (value, index) => ({ index, content: value })
  );

  const mutateCoverImage = useOnClickUpdate({
    mutationFn: updateCharacterCoverImage(workspace_id, character_id),
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    savingMessage: "캐릭터 이미지 변경 중",
    errorMessage: "캐릭터 이미지 변경에 실패했습니다.",
    onMutate: (value: File) => {
      const prevData = queryClient.getQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id)
      );
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        (prev: any) => ({
          ...prev,
          ch_image: URL.createObjectURL(value),
        })
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        workspaceQueryKeys.characterDetail(workspace_id, character_id),
        context?.prevData
      );
    },
  });
  const onChangeCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutateCoverImage(file)();
  };

  return {
    data,
    error,
    isLoading,
    characteristicList,

    onChangeName,
    onChangeRole,
    onChangeCoverImage,
    onChangeDescription,
    onChangeGender,
    onChangeBirthday,

    onClickAddCharacteristic,
    onClickRemoveCharacteristic,
    onChangeCharacteristicTitle,
    onChangeCharacteristicContent,
    onClickDeleteCharacter,
  };
}

export const CharacterContext = createContext(
  {} as ReturnType<typeof useCharacter>
);
