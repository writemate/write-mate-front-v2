import { addCharacter, deleteCharacter } from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToastMessage from "./showToastMessage";

const useModalCharacter = (eventId: string) => {
  const queryClient = useQueryClient();

  // 캐릭터 추가하기
  const addCharacterMutate = useMutation({
    mutationFn: (characterId: string) => addCharacter(eventId, characterId),
    onSuccess: () => {
      showToastMessage("인물이 추가되었습니다.", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.characterModal(eventId),
      });
    },
    onError: () => {
      showToastMessage("인물 추가에 실패했습니다.", "error");
    },
  });

  // 캐릭터 삭제하기
  const deleteCharacterMutate = useMutation({
    mutationFn: (characterId: string) => deleteCharacter(eventId, characterId),
    onSuccess: () => {
      showToastMessage("인물이 삭제되었습니다", "success");

      queryClient.invalidateQueries({
        queryKey: workspaceQueryKeys.characterModal(eventId),
      });
    },
    onError: () => {
      showToastMessage("인물 삭제에 실패했습니다.", "error");
    },
  });

  return { addCharacterMutate, deleteCharacterMutate };
};

export default useModalCharacter;
