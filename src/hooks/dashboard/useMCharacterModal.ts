import { debounce } from "@/utils";
import {
  updateMCharacterName,
  updateMCharacterRole,
  updateMCharacterDescription,
  updateMCharacterGender,
  updateMCharacterBirthday,
  createMCharacterCharacteristic,
  updateMCharacterCharacteristicTitle,
  updateMCharacterCharacteristicContent,
  deleteMCharacterCharacteristic,
  deleteMCharacter,
  getMCharacter,
} from "@/utils/APIs/memo";
import { mCharacterQueryKeys, memoQueryKeys } from "@/utils/APIs/queryKeys";
import { TMCharacter } from "@/utils/APIs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

function useUpdate<T, U>({
  updateFn,
  onMutate,
  onChange,
  character_id,
}: {
  updateFn: (value: T) => Promise<void>;
  onMutate: (value: T) => void;
  onChange: (debouncedMutate: (value: T) => void) => U;
  character_id: string;
}) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateFn,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: mCharacterQueryKeys.all(character_id),
      }),
    onMutate,
  });
  const debouncedMutate = debounce(mutate, 500);
  return { onChange: onChange(debouncedMutate), isPending };
}

export default function useMCharacterModal() {
  const queryClient = useQueryClient();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedMCharacter, setSelectedMCharacter] = useState<TMCharacter>({
    id: "",
    ch_name: "",
    ch_image: "",
    description: "",
    role: "",
    gender: "",
    birthday: "",
    characteristic: [],
    updatedAt: "",
  });
  const [characteristicList, setCharacteristicList] = useState<
    TMCharacter["characteristic"]
  >([]);

  const nameRef = document.getElementsByClassName("memo-modal-name");
  const descriptionRef = document.getElementsByClassName(
    "memo-modal-description"
  );

  const { data: mCharacter } = useQuery({
    queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
    enabled: selectedMCharacter.id !== "",
    queryFn: getMCharacter(selectedMCharacter.id),
  });

  useEffect(() => {
    if (selectedMCharacter.id !== "" && mCharacter) {
      setSelectedMCharacter(mCharacter);
    }
  }, [mCharacter]);

  useEffect(() => {
    if (mCharacter) {
      setCharacteristicList(mCharacter.characteristic);
    }
  }, [mCharacter]);

  const { mutate: createMCharacterCharacteristicMutation } = useMutation({
    mutationFn: createMCharacterCharacteristic,
    onSuccess: () => {
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });

  const { mutate: deleteMCharacterCharacteristicMutation } = useMutation({
    mutationFn: deleteMCharacterCharacteristic,
    onSuccess: () => {
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });

  const { mutate: deleteMCharacterMutation } = useMutation({
    mutationFn: deleteMCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
    },
  });

  const onClickMCharacterName = (memoCharacter: TMCharacter) => () => {
    setSelectedMCharacter(memoCharacter);
    focusInput(nameRef);
    setIsOpenEditModal(true);
  };
  const onClickMCharacterDescription = (memoCharacter: TMCharacter) => () => {
    setSelectedMCharacter(memoCharacter);
    focusInput(descriptionRef);
    setIsOpenEditModal(true);
  };
  const onClickAddCharacteristic = () => {
    if (selectedMCharacter) {
      createMCharacterCharacteristicMutation({
        id: selectedMCharacter.id,
        title: " ", // 빈문자열로 바꾸어야 함
        content: " ", // 빈문자열로 바꾸어야 함
      });
    }
  };

  const { onChange: onChangeSelectedMCharacterName } = useUpdate({
    updateFn: updateMCharacterName,
    onMutate: (value: { id: string; ch_name: string }) =>
      setSelectedMCharacter((old) => ({ ...old, ch_name: value.ch_name })),
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) =>
      debouncedMutate({ id: selectedMCharacter.id, ch_name: e.target.value }),
    character_id: selectedMCharacter.id,
  });

  const { onChange: onChangeSelectedMCharacterRole } = useUpdate({
    updateFn: updateMCharacterRole,
    onMutate: (value: { id: string; role: string }) =>
      setSelectedMCharacter((old) => ({ ...old, role: value.role })),
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) =>
      debouncedMutate({ id: selectedMCharacter.id, role: e.target.value }),
    character_id: selectedMCharacter.id,
  });

  const { onChange: onChangeSelectedMCharacterDescription } = useUpdate({
    updateFn: updateMCharacterDescription,
    onMutate: (value: { id: string; description: string }) =>
      setSelectedMCharacter((old) => ({
        ...old,
        description: value.description,
      })),
    onChange:
      (debouncedMutate) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        debouncedMutate({
          id: selectedMCharacter.id,
          description: e.target.value,
        }),
    character_id: selectedMCharacter.id,
  });

  const { onChange: onChangeSelectedMCharacterBirthday } = useUpdate({
    updateFn: updateMCharacterBirthday,
    onMutate: (value: { id: string; birthday: string }) =>
      setSelectedMCharacter((old) => ({ ...old, birthday: value.birthday })),
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) =>
      debouncedMutate({ id: selectedMCharacter.id, birthday: e.target.value }),
    character_id: selectedMCharacter.id,
  });

  const { onChange: onChangeSelectedMCharacterGender } = useUpdate({
    updateFn: updateMCharacterGender,
    onMutate: (value: { id: string; gender: string }) =>
      setSelectedMCharacter((old) => ({ ...old, gender: value.gender })),
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) =>
      debouncedMutate({ id: selectedMCharacter.id, gender: e.target.value }),
    character_id: selectedMCharacter.id,
  });

  const {
    mutate: characteristicTitleMutation,
    isPending: isPendingCharacteristicTitle,
  } = useMutation({
    mutationFn: updateMCharacterCharacteristicTitle,
  });

  const debounceCharacteristicTitle = debounce(
    characteristicTitleMutation,
    500
  );

  const onChangeSelectedMCharacterCharacteristicTitle =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharacteristicList((prev) =>
        prev.map((c, i) => (i === index ? { ...c, title: e.target.value } : c))
      );
      debounceCharacteristicTitle({
        id: selectedMCharacter.id,
        idx: index,
        title: e.target.value,
      });
    };

  const {
    mutate: characteristicContentMutation,
    isPending: isPendingCharacteristicContent,
  } = useMutation({
    mutationFn: updateMCharacterCharacteristicContent,
  });

  const debounceCharacteristicContent = debounce(
    characteristicContentMutation,
    500
  );

  const onChangeSelectedMCharacterCharacteristicContent =
    (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharacteristicList((prev) =>
        prev.map((c, i) =>
          i === index ? { ...c, content: e.target.value } : c
        )
      );
      debounceCharacteristicContent({
        id: selectedMCharacter.id,
        idx: index,
        content: e.target.value,
      });
    };

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onDeleteMCharacterCharacteristic = (
    selectedCharacteristicIdx: number
  ) => {
    deleteMCharacterCharacteristicMutation({
      id: selectedMCharacter.id,
      idx: selectedCharacteristicIdx,
    });

    setSelectedMCharacter((old) => {
      const updatedCharacteristics = old.characteristic.filter(
        (_, idx) => idx !== selectedCharacteristicIdx
      );
      console.log("After deletion:", updatedCharacteristics);
      return {
        ...old,
        characteristic: updatedCharacteristics,
      };
    });
  };

  const onDeleteMCharacter = () => {
    if (selectedMCharacter) {
      deleteMCharacterMutation(selectedMCharacter.id);
    }
  };

  function focusInput(ref: HTMLCollectionOf<Element>) {
    window.setTimeout(() => {
      if (ref.length > 0) (ref[0] as HTMLElement).focus();
    }, 0);
  }
  function closeMemoModal() {
    setIsOpenEditModal(false);
    setSelectedMCharacter({
      id: "",
      ch_name: "",
      ch_image: "",
      description: "",
      role: "",
      gender: "",
      birthday: "",
      characteristic: [],
      updatedAt: "",
    });
  }
  function rollbackMCharacterAndCloseModal() {
    if (mCharacter) {
      setSelectedMCharacter(mCharacter);
    }
    closeMemoModal();
  }

  return {
    isOpenEditModal,
    selectedMCharacter,
    characteristicList,
    closeEditModal: closeMemoModal,
    onClickMCharacterName,
    onClickMCharacterDescription,
    onClickAddCharacteristic,
    onChangeSelectedMCharacterName,
    onChangeSelectedMCharacterRole,
    onChangeSelectedMCharacterDescription,
    onChangeSelectedMCharacterBirthday,
    onChangeSelectedMCharacterGender,
    onChangeSelectedMCharacterCharacteristicTitle,
    onChangeSelectedMCharacterCharacteristicContent,
    onDeleteMCharacterCharacteristic,
    onKeyDownName,
    onDeleteMCharacter,
    rollbackMCharacterAndCloseModal,
  };
}
