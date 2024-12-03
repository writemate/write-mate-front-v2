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
import { use, useCallback, useEffect, useState } from "react";

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

  const { mutate: updateMCharacterNameMutation } = useMutation({
    mutationFn: updateMCharacterName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });
  const { mutate: updateMCharacterDescriptionMutation } = useMutation({
    mutationFn: updateMCharacterDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });
  const { mutate: updateMCharacterBirthdayMutation } = useMutation({
    mutationFn: updateMCharacterBirthday,
    onSuccess: () => {
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });
  const { mutate: updateMCharacterRoleMutation } = useMutation({
    mutationFn: updateMCharacterRole,
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
      if (selectedMCharacter) {
        queryClient.invalidateQueries({
          queryKey: mCharacterQueryKeys.all(selectedMCharacter.id),
        });
      }
    },
  });

  const debounceUpdateMCharacterName = useCallback(
    debounce(updateMCharacterNameMutation, 500),
    [selectedMCharacter]
  );

  const debounceUpdateMCharacterDescription = useCallback(
    debounce(updateMCharacterDescriptionMutation, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterBirthday = useCallback(
    debounce(updateMCharacterBirthdayMutation, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterRole = useCallback(
    debounce(updateMCharacterRoleMutation, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterGender = useCallback(
    debounce(updateMCharacterGender, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterCharacteristicTitle = useCallback(
    debounce(updateMCharacterCharacteristicTitle, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterCharacteristicContent = useCallback(
    debounce(updateMCharacterCharacteristicContent, 500),
    [selectedMCharacter]
  );

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
      createMCharacterCharacteristic({
        id: selectedMCharacter.id,
        characteristic: [{ title: "", content: "" }],
      });
    }
  };

  const onChangeSelectedMCharacterName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterName({
        id: selectedMCharacter.id,
        ch_name: e.target.value,
      });
    }
    setSelectedMCharacter((old) => ({ ...old, ch_name: e.target.value }));
  };
  const onChangeSelectedMCharacterRole = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterRole({
        id: selectedMCharacter.id,
        role: e.target.value,
      });
    }
    setSelectedMCharacter((old) => ({ ...old, role: e.target.value }));
  };
  const onChangeSelectedMCharacterDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterDescription({
        id: selectedMCharacter.id,
        description: e.target.value,
      });
    }
    setSelectedMCharacter((old) => ({ ...old, description: e.target.value }));
  };
  const onChangeSelectedMCharacterBirthday = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterBirthday({
        id: selectedMCharacter.id,
        birthday: e.target.value,
      });
    }
    setSelectedMCharacter((old) => ({ ...old, birthday: e.target.value }));
  };
  const onChangeSelectedMCharacterGender = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterGender({
        id: selectedMCharacter.id,
        gender: e.target.value,
      });
    }
    setSelectedMCharacter((old) => ({ ...old, gender: e.target.value }));
  };

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onDeleteMemo = () => {
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

  return {
    isOpenEditModal,
    selectedMCharacter,
    closeEditModal: closeMemoModal,
    onClickMCharacterName,
    onClickMCharacterDescription,
    onClickAddCharacteristic,
    onChangeSelectedMCharacterName,
    onChangeSelectedMCharacterRole,
    onChangeSelectedMCharacterDescription,
    onChangeSelectedMCharacterBirthday,
    onChangeSelectedMCharacterGender,
    onKeyDownName,
    onDeleteMemo,
  };
}
