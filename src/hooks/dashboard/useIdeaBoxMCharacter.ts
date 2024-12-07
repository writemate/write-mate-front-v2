import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { useEffect, useState } from "react";
import { TMCharacter } from "@/utils/APIs/types";
import {
  getMCharacterList,
  createMCharacter,
  deleteMCharacter,
} from "@/utils/APIs/memo";
import { notifySuccess } from "@/utils/showToast";

export default function useIdeaBoxMCharacter() {
  const queryClient = useQueryClient();
  const [memoCharacterList, setMCharacterList] = useState<TMCharacter[]>([]);
  const { data, error, isLoading } = useQuery<TMCharacter[]>({
    queryKey: memoQueryKeys.memoCharacterList(),
    queryFn: getMCharacterList,
  });
  const { isPending: isCreating, mutateAsync: createMCharacterMutateAsync } =
    useMutation({
      mutationFn: createMCharacter,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: memoQueryKeys.memoCharacterList(),
        });
        notifySuccess("메모가 생성되었습니다.");
      },
    });

  const { mutate: deleteMCharacterMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteMCharacter,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: memoQueryKeys.memoCharacterList(),
        });
      },
      onMutate: async (id: string) => {
        const previousMCharacterList = queryClient.getQueryData<TMCharacter[]>(
          memoQueryKeys.memoCharacterList()
        );
        queryClient.setQueryData<TMCharacter[]>(
          memoQueryKeys.memoCharacterList(),
          (old) => old?.filter((memoCharacter) => memoCharacter.id !== id) || []
        );
        return { previousMCharacterList };
      },
    });

  const onClickDeleteMCharacter = (id: string) => () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    deleteMCharacterMutation(id);
  };

  async function getNewlyCreatedMCharacter() {
    const createdId = await createMCharacterMutateAsync();
    if (!createdId) return null;
    const newMCharacter: TMCharacter = {
      id: createdId,
      ch_name: "",
      description: "",
      updatedAt: new Date().toISOString(),
      ch_image: "",
      role: "",
      gender: "",
      birthday: "",
      characteristic: [],
    };
    return newMCharacter;
  }
  useEffect(() => {
    if (data) {
      setMCharacterList(data);
    }
  }, [data]);

  return {
    memoCharacterList,
    error,
    isLoading,
    isCreating,
    isDeleting,
    setMCharacterList,
    onClickDeleteMCharacter,
    getNewlyCreatedMCharacter,
  };
}
