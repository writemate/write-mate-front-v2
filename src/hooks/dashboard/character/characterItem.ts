import { dashboardQueryKeys } from "@/utils/APIs/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useCharacterItem(characterId: string) {
  const queryClient = useQueryClient();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const onClickItem = () => {
    setIsOpenEditModal(true);
  };

  const closeEditModal = () => {
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
