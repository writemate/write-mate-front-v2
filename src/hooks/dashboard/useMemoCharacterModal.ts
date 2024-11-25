import { debounce } from "@/utils";
import {
  deleteMemoCharacter,
  updateMemoCharacterDescription,
  updateMemoCharacterName,
} from "@/utils/APIs/memo";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { TMemoCharacter } from "@/utils/APIs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export default function useMemoCharacterModal() {
  const queryClient = useQueryClient();

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedMemoCharacter, setSelectedMemoCharacter] =
    useState<TMemoCharacter | null>(null);
  const nameRef = document.getElementsByClassName("memo-modal-name");
  const descriptionRef = document.getElementsByClassName(
    "memo-modal-description"
  );

  const { mutate: updateMemoCharacterNameMutation } = useMutation({
    mutationFn: updateMemoCharacterName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
    },
  });
  const { mutate: updateMemoCharacterDescriptionMutation } = useMutation({
    mutationFn: updateMemoCharacterDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
    },
  });
  const { mutate: deleteMemoCharacterMutation } = useMutation({
    mutationFn: deleteMemoCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
    },
  });

  const debounceUpdateMemoCharacterName = useCallback(
    debounce(updateMemoCharacterNameMutation, 500),
    [selectedMemoCharacter]
  );
  const debounceUpdateMemoCharacterDescription = useCallback(
    debounce(updateMemoCharacterDescriptionMutation, 500),
    [selectedMemoCharacter]
  );

  const onClickMemoCharacterName = (memoCharacter: TMemoCharacter) => () => {
    setSelectedMemoCharacter(memoCharacter);
    focusInput(nameRef);
    setOpenEditModal(true);
  };
  const onClickMemoCharacterDescription =
    (memoCharacter: TMemoCharacter) => () => {
      setSelectedMemoCharacter(memoCharacter);
      focusInput(descriptionRef);
      setOpenEditModal(true);
    };

  const onChangeSelectedMemoCharacterName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMemoCharacter) {
      debounceUpdateMemoCharacterName({
        id: selectedMemoCharacter.id,
        ch_name: e.target.value,
      });
    }
    setSelectedMemoCharacter((old) =>
      old ? { ...old, memo_name: e.target.value } : null
    );
  };
  const onChangeSelectedMemoCharacterDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (selectedMemoCharacter) {
      debounceUpdateMemoCharacterDescription({
        id: selectedMemoCharacter.id,
        description: e.target.value,
      });
    }
    setSelectedMemoCharacter((old) =>
      old ? { ...old, memo_description: e.target.value } : null
    );
  };

  const onKeyDownName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      (descriptionRef[0] as HTMLElement).focus();
    }
  };

  const onDeleteMemo = () => {
    if (selectedMemoCharacter) {
      deleteMemoCharacterMutation(selectedMemoCharacter.id);
    }
  };

  function focusInput(ref: HTMLCollectionOf<Element>) {
    window.setTimeout(() => {
      if (ref.length > 0) (ref[0] as HTMLElement).focus();
    }, 0);
  }
  function closeMemoModal() {
    setOpenEditModal(false);
    setSelectedMemoCharacter(null);
  }

  return {
    openEditModal,
    selectedMemoCharacter,
    closeEditModal: closeMemoModal,
    onClickMemoCharacterName,
    onClickMemoCharacterDescription,
    onChangeSelectedMemoCharacterName,
    onChangeSelectedMemoCharacterDescription,
    onKeyDownName,
    onDeleteMemo,
  };
}
