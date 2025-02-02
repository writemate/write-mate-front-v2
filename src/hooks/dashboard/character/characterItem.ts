import { useSaveLoading } from "@/stores/useSaveLoading";
import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { notifyWarning } from "@/utils/showToast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCharacterItem(characterId: string) {
  const queryClient = useQueryClient();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const isSaving = useSaveLoading().checkIsSaving();

  const onClickItem = () => {
    setIsOpenEditModal(true);
  };

  const closeEditModal = () => {
    if (isSaving) {
      notifyWarning("저장 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    queryClient.invalidateQueries({
      queryKey: dashboardQueryKeys.characterDetail(characterId),
    });
    setIsOpenEditModal(false);
  };

  return {
    isOpenEditModal,
    onClickItem,
    closeEditModal,
  };
}
