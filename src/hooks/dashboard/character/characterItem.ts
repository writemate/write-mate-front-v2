import { useInputLiveUpdate } from "@/hooks/common/useInputLiveUpdate";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
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
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { TCharacter, TMCharacter, TSimpleCharacter } from "@/utils/APIs/types";
import { notifySuccess } from "@/utils/showToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useRef, useState } from "react";

export function useCharacterItem(curCharacter: TMCharacter) {
  const queryClient = useQueryClient();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [deleteCharacteristic, setDeleteCharacteristic] = useState(-1);
  const [character, setCharacter] = useState(curCharacter);
  const [characteristicList, setCharacteristicList] = useState(
    character.characteristic
  );
  const nameRef = document.getElementsByClassName("character-modal-name");
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: [dashboardQueryKeys.character(), character.id],
    queryFn: getMCharacter(character.id),
  });

  const onClickItem = () => {
    focusInput(nameRef);
    setIsOpenEditModal(true);
  };

  const closeEditModal = () => {
    queryClient.invalidateQueries({
      queryKey: [dashboardQueryKeys.character()],
    });
    setIsOpenEditModal(false);
  };

  const onChangeName = useInputLiveUpdate(
    updateMCharacterName(character.id),
    "캐릭터 이름 변경",
    "캐릭터 이름 변경에 실패하였습니다."
  );

  const onChangeRole = useInputLiveUpdate(
    updateMCharacterRole(character.id),
    "캐릭터 역할 변경",
    "캐릭터 역할 변경에 실패하였습니다."
  );

  const mutateImage = useOnClickUpdate({
    mutationFn: updateMCharacterImage(character.id),
    queryKey: ["mCharacterImage", character.id],
    savingMessage: "이미지 변경 중",
    errorMessage: "이미지 변경에 실패했습니다.",
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [dashboardQueryKeys.character(), character.id],
      });
    },
    onMutate: (value: File) => {
      const prevData = queryClient.getQueryData<TMCharacter>([
        dashboardQueryKeys.character(),
        character.id,
      ]);
      queryClient.setQueryData([dashboardQueryKeys.character(), character.id], {
        ...prevData,
        ch_image: URL.createObjectURL(value),
      });
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [dashboardQueryKeys.character(), character.id],
        context?.prevData
      );
    },
  });
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    mutateImage(file)();
  };
  const onClickChangeImage = () => {
    imageInputRef.current?.click();
  };

  const onChangeDescription = useInputLiveUpdate(
    updateMCharacterDescription(character.id),
    "캐릭터 설명 변경",
    "캐릭터 설명 변경에 실패하였습니다."
  );

  const onChangeBirthday = useInputLiveUpdate(
    updateMCharacterBirthday(character.id),
    "캐릭터 생일 변경",
    "캐릭터 생일 변경에 실패하였습니다."
  );

  const onChangeGender = useInputLiveUpdate(
    updateMCharacterGender(character.id),
    "캐릭터 성별 변경",
    "캐릭터 성별 변경에 실패하였습니다."
  );

  const onClickAddCharacteristic = useOnClickUpdate({
    mutationFn: createMCharacterCharacteristic(character.id),
    queryKey: [dashboardQueryKeys.character(), character.id],
    savingMessage: "캐릭터에 특징 추가 중",
    errorMessage: "캐릭터 특징 추가에 실패했습니다.",
    onMutate: () => {
      const prevData = queryClient.getQueryData<TMCharacter>([
        dashboardQueryKeys.character(),
        character.id,
      ]);
      if (!prevData) return;
      queryClient.setQueryData(
        [dashboardQueryKeys.character(), character.id],
        (prev: any) => {
          return {
            ...prev,
            ch_image: prevData.ch_image,
          };
        }
      );
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [dashboardQueryKeys.character(), character.id],
        context?.prevData
      );
    },
  })();

  const onChangeCharacteristicTitle = useInputLiveUpdate(
    updateMCharacterCharacteristicTitle(character.id),
    "특징 제목 변경",
    "특징 제목 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, title: value } : c))
      ),
    (value, index) => ({ index, title: value })
  );

  const onChangeCharacteristicContent = useInputLiveUpdate(
    updateMCharacterCharacteristicContent(character.id),
    "특징 내용 변경",
    "특징 내용 변경에 실패했습니다.",
    (value, index) =>
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, content: value } : c))
      ),
    (value, index) => ({ index, content: value })
  );

  const onDeleteMCharacter = useOnClickUpdate({
    mutationFn: deleteMCharacter(character.id),
    queryKey: [dashboardQueryKeys.character()],
    savingMessage: "인물 삭제 중",
    errorMessage: "인물 삭제에 실패하였습니다.",
    onSuccess: () => {
      notifySuccess("인물이 삭제되었습니다.");
      closeEditModal();
      closeDeleteModal();
    },
  })();

  const onDeleteCharacteristic = useOnClickUpdate({
    mutationFn: deleteMCharacterCharacteristic(character.id),
    queryKey: [dashboardQueryKeys.character(), character.id],
    savingMessage: "캐릭터에서 특징 삭제 중",
    errorMessage: "캐릭터 특징 삭제에 실패했습니다.",
    onMutate: (index: number) => {
      const prevData = queryClient.getQueryData<TMCharacter>([
        dashboardQueryKeys.character(),
        character.id,
      ]);
      if (!prevData) return;
      queryClient.setQueryData([dashboardQueryKeys.character(), character.id], {
        ...prevData,
        characteristic: prevData.characteristic.filter((_, i) => i !== index),
      });
      return { prevData };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [dashboardQueryKeys.character(), character.id],
        context?.prevData
      );
    },
  });

  useEffect(() => {
    setCharacteristicList(character.characteristic);
  }, [character.characteristic]);

  useEffect(() => {
    if (data) {
      setCharacter(data);
      setCharacteristicList(data.characteristic);
    }
  }, [data]);

  const onClickOpenDeleteModal = (index?: number) => () => {
    setDeleteCharacteristic(index ?? -1);
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteCharacteristic(-1);
    setIsOpenDeleteModal(false);
  };

  return {
    character,
    imageInputRef,
    isOpenEditModal,
    isOpenDeleteModal,
    deleteCharacteristic,
    characteristicList,
    onClickItem,
    onClickChangeImage,
    onClickAddCharacteristic,
    onClickOpenDeleteModal,
    onChangeName,
    onChangeRole,
    onChangeImage,
    onChangeDescription,
    onChangeBirthday,
    onChangeGender,
    onChangeCharacteristicTitle,
    onChangeCharacteristicContent,
    onDeleteCharacteristic,
    onDeleteMCharacter,
    closeEditModal,
    closeDeleteModal,
    getName,
  };
}

export const CharacterItemContext = createContext(
  {} as ReturnType<typeof useCharacterItem>
);

function focusInput(ref: HTMLCollectionOf<Element>) {
  window.setTimeout(() => {
    if (ref.length > 0) (ref[0] as HTMLElement).focus();
  }, 0);
}

export const getName = (
  character: TMCharacter | TCharacter | TSimpleCharacter
) => {
  const DEFAULT_NAME = "새 인물";

  if (!character) return DEFAULT_NAME;
  if (!character.description && !character.ch_name) return DEFAULT_NAME;
  if (!character.ch_name)
    return "" + character.description.slice(0, 10) + "...";
  if (character.ch_name.length > 10)
    return character.ch_name.slice(0, 10) + "...";
  return character.ch_name;
};
