import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import {
  createMCharacterCharacteristic,
  deleteMCharacter,
  deleteMCharacterCharacteristic,
  getMCharacter,
  updateMCharacterBirthday,
  updateMCharacterCharacteristicContent,
  updateMCharacterCharacteristicTitle,
  updateMCharacterDescription,
  updateMCharacterGender,
  updateMCharacterImage,
  updateMCharacterName,
  updateMCharacterRole,
} from "@/utils/APIs/memo";
import { useState, useEffect } from "react";
import { TMCharacter } from "@/utils/APIs/types";
import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { useCharacter } from "@/hooks/workspace/character/character";

export function useMemoCharacter(
  characterId: string
): ReturnType<typeof useCharacter> {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: dashboardQueryKeys.characterDetail(characterId),
    queryFn: getMCharacter(characterId),
  });

  const onClickDeleteCharacter = useOnClickUpdate({
    mutationFn: deleteMCharacter(characterId),
    queryKey: dashboardQueryKeys.characterList(),
    savingMessage: "캐릭터 삭제 중",
    errorMessage: "캐릭터 삭제에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.characterList()
      );
      queryClient.setQueryData(
        dashboardQueryKeys.characterList(),
        (prev: any) => prev.filter((c: any) => c.id !== characterId)
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        dashboardQueryKeys.characterList(),
        context?.prevData
      );
    },
  })();

  const onChangeName = useInputLiveUpdate(
    updateMCharacterName(characterId),
    "캐릭터 이름 변경",
    "캐릭터 이름 변경에 실패했습니다."
  );
  const onChangeRole = useInputLiveUpdate(
    updateMCharacterRole(characterId),
    "역할 변경",
    "역할 변경에 실패했습니다."
  );
  const onChangeGender = useInputLiveUpdate(
    updateMCharacterGender(characterId),
    "성별 변경",
    "성별 변경에 실패했습니다."
  );
  const onChangeBirthday = useInputLiveUpdate(
    updateMCharacterBirthday(characterId),
    "생일 변경",
    "생일 변경에 실패했습니다."
  );
  const onChangeDescription = useInputLiveUpdate(
    updateMCharacterDescription(characterId),
    "설명 변경",
    "설명 변경에 실패했습니다."
  );

  const [characteristicList, setCharacteristicList] = useState<
    TMCharacter["characteristic"]
  >([]);

  useEffect(() => {
    if (data) {
      setCharacteristicList(data.characteristic);
    }
  }, [data]);

  const onClickAddCharacteristic = useOnClickUpdate({
    mutationFn: createMCharacterCharacteristic(characterId),
    queryKey: dashboardQueryKeys.characterDetail(characterId),
    savingMessage: "캐릭터에 특징 추가 중",
    errorMessage: "캐릭터 특징 추가에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.characterDetail(characterId)
      );
      if (!prevData) return;
      queryClient.setQueryData(
        dashboardQueryKeys.characterDetail(characterId),
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
        dashboardQueryKeys.characterDetail(characterId),
        context?.prevData
      );
    },
  })();

  const onClickRemoveCharacteristic = useOnClickUpdate({
    mutationFn: deleteMCharacterCharacteristic(characterId),
    queryKey: dashboardQueryKeys.characterDetail(characterId),
    savingMessage: "캐릭터에서 특징 삭제 중",
    errorMessage: "캐릭터 특징 삭제에 실패했습니다.",
    onMutate: (index: number) => {
      const prevData = queryClient.getQueryData<TMCharacter>(
        dashboardQueryKeys.characterDetail(characterId)
      );
      if (!prevData) return;
      queryClient.setQueryData(
        dashboardQueryKeys.characterDetail(characterId),
        {
          ...prevData,
          characteristic: characteristicList.filter((_, i) => i !== index),
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        dashboardQueryKeys.characterDetail(characterId),
        context?.prevData
      );
    },
  });

  const onChangeCharacteristicTitle = useInputLiveUpdate(
    updateMCharacterCharacteristicTitle(characterId),
    "특징 제목 변경",
    "특징 제목 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, title: value } : c))
      ),
    (value, index) => ({ index, title: value })
  );

  const onChangeCharacteristicContent = useInputLiveUpdate(
    updateMCharacterCharacteristicContent(characterId),
    "특징 내용 변경",
    "특징 내용 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, content: value } : c))
      ),
    (value, index) => ({ index, content: value })
  );

  const mutateCoverImage = useOnClickUpdate({
    mutationFn: updateMCharacterImage(characterId),
    queryKey: dashboardQueryKeys.characterDetail(characterId),
    savingMessage: "캐릭터 이미지 변경 중",
    errorMessage: "캐릭터 이미지 변경에 실패했습니다.",
    onMutate: (value: File) => {
      const prevData = queryClient.getQueryData(
        dashboardQueryKeys.characterDetail(characterId)
      );
      queryClient.setQueryData(
        dashboardQueryKeys.characterDetail(characterId),
        (prev: any) => ({
          ...prev,
          ch_image: URL.createObjectURL(value),
        })
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        dashboardQueryKeys.characterDetail(characterId),
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
  } as ReturnType<typeof useCharacter>;
}
