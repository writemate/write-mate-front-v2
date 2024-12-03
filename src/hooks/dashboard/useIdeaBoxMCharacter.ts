import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { useCallback, useEffect, useState } from "react";
import { TMCharacter } from "@/utils/APIs/types";
import {
  getMCharacterList,
  createMCharacter,
  deleteMCharacter,
  updateMCharacterName,
  updateMCharacterDescription,
  updateMCharacterImage,
  updateMCharacterRole,
  updateMCharacterBirthday,
  updateMCharacterGender,
  createMCharacterCharacteristic,
  updateMCharacterCharacteristicTitle,
  updateMCharacterCharacteristicContent,
  deleteMCharacterCharacteristic,
} from "@/utils/APIs/memo";
import { debounce } from "@/utils";
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
  const { mutate: updateMCharacterNameMutation, isPending: isUpdatingName } =
    useMutation({ mutationFn: updateMCharacterName });
  const {
    mutate: updateMCharacterDescriptionMutation,
    isPending: isUpdatingDescription,
  } = useMutation({ mutationFn: updateMCharacterDescription });
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
  const { mutate: updateMCharacterImageMutation } = useMutation({
    mutationFn: updateMCharacterImage,
  });
  const { mutate: updateMCharacterRoleMutation } = useMutation({
    mutationFn: updateMCharacterRole,
  });
  const { mutate: updateMCharacterBirthdayMutation } = useMutation({
    mutationFn: updateMCharacterBirthday,
  });
  const { mutate: updateMCharacterGenderMutation } = useMutation({
    mutationFn: updateMCharacterGender,
  });
  const { mutate: createMCharacterCharacteristicMutation } = useMutation({
    mutationFn: createMCharacterCharacteristic,
  });
  const { mutate: updateMCharacterCharacteristicTitleMutation } = useMutation({
    mutationFn: updateMCharacterCharacteristicTitle,
  });
  const { mutate: updateMCharacterCharacteristicContentMutation } = useMutation(
    {
      mutationFn: updateMCharacterCharacteristicContent,
    }
  );
  const { mutate: deleteMCharacterCharacteristicMutation } = useMutation({
    mutationFn: deleteMCharacterCharacteristic,
  });

  const debounceUpdateMCharacterName = useCallback(
    debounce(updateMCharacterNameMutation, 500),
    [data]
  );
  const debounceUpdateMCharacterDescription = useCallback(
    debounce(updateMCharacterDescriptionMutation, 500),
    [data]
  );

  const onClickDeleteMCharacter = (id: string) => () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    deleteMCharacterMutation(id);
  };
  const onChangeMCharacterName =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceUpdateMCharacterName({ id, ch_name: e.target.value });
      setMCharacterList((old) =>
        old.map((memoCharacter) =>
          memoCharacter.id === id
            ? { ...memoCharacter, ch_name: e.target.value }
            : memoCharacter
        )
      );
    };
  const onChangeMCharacterDescription =
    (id: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounceUpdateMCharacterDescription({
        id,
        description: e.target.value,
      });
      setMCharacterList((old) =>
        old.map((memoCharacter) =>
          memoCharacter.id === id
            ? { ...memoCharacter, description: e.target.value }
            : memoCharacter
        )
      );
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
    isUpdatingName,
    isUpdatingDescription,
    isDeleting,
    setMCharacterList,
    onClickDeleteMCharacter,
    onChangeMCharacterName,
    onChangeMCharacterDescription,
    getNewlyCreatedMCharacter,
  };
}
