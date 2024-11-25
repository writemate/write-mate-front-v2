import { debounce } from "@/utils";
import {
  deleteMCharacter,
  updateMCharacterDescription,
  updateMCharacterName,
} from "@/utils/APIs/memo";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { TMCharacter } from "@/utils/APIs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export default function useMCharacterModal() {
  const queryClient = useQueryClient();

  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedMCharacter, setSelectedMCharacter] =
    useState<TMCharacter | null>(null);
  const nameRef = document.getElementsByClassName("memo-modal-name");
  const descriptionRef = document.getElementsByClassName(
    "memo-modal-description"
  );

  const { mutate: updateMCharacterNameMutation } = useMutation({
    mutationFn: updateMCharacterName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
    },
  });
  const { mutate: updateMCharacterDescriptionMutation } = useMutation({
    mutationFn: updateMCharacterDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoQueryKeys.memoCharacterList(),
      });
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

  const debounceUpdateMCharacterName = useCallback(
    debounce(updateMCharacterNameMutation, 500),
    [selectedMCharacter]
  );
  const debounceUpdateMCharacterDescription = useCallback(
    debounce(updateMCharacterDescriptionMutation, 500),
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

  const onChangeSelectedMCharacterName = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedMCharacter) {
      debounceUpdateMCharacterName({
        id: selectedMCharacter.id,
        ch_name: e.target.value,
      });
    }
    setSelectedMCharacter((old) =>
      old ? { ...old, memo_name: e.target.value } : null
    );
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
    setSelectedMCharacter((old) =>
      old ? { ...old, memo_description: e.target.value } : null
    );
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
    setSelectedMCharacter(null);
  }

  return {
    isOpenEditModal,
    selectedMCharacter,
    closeEditModal: closeMemoModal,
    onClickMCharacterName,
    onClickMCharacterDescription,
    onChangeSelectedMCharacterName,
    onChangeSelectedMCharacterDescription,
    onKeyDownName,
    onDeleteMemo,
  };
}
