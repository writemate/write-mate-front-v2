import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memoQueryKeys } from "@/utils/APIs/queryKeys";
import { useCallback, useEffect, useState } from "react";
import { TMemoCharacter } from "@/utils/APIs/types";
import {
  getMemoCharacterList,
  createMemoCharacter,
  deleteMemoCharacter,
  updateMemoCharacterName,
  updateMemoCharacterDescription,
  updateMemoCharacterImage,
  updateMemoCharacterRole,
  updateMemoCharacterBirthday,
  updateMemoCharacterGender,
  createMemoCharacterCharacteristic,
  updateMemoCharacterCharacteristicTitle,
  updateMemoCharacterCharacteristicContent,
  deleteMemoCharacterCharacteristic,
} from "@/utils/APIs/memo";
import { debounce } from "@/utils";
import { notifySuccess } from "@/utils/showToast";

export default function useIdeaBoxMemoCharacter() {
  const queryClient = useQueryClient();
  const [memoCharacterList, setMemoCharacterList] = useState<TMemoCharacter[]>(
    []
  );
  const { data, error, isLoading } = useQuery<TMemoCharacter[]>({
    queryKey: memoQueryKeys.memoCharacterList(),
    queryFn: getMemoCharacterList,
  });
  const { isPending: isCreating, mutateAsync: createMemoCharacterMutateAsync } =
    useMutation({
      mutationFn: createMemoCharacter,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: memoQueryKeys.memoCharacterList(),
        });
        notifySuccess("메모가 생성되었습니다.");
      },
    });
  const { mutate: updateMemoCharacterNameMutation, isPending: isUpdatingName } =
    useMutation({ mutationFn: updateMemoCharacterName });
  const {
    mutate: updateMemoCharacterDescriptionMutation,
    isPending: isUpdatingDescription,
  } = useMutation({ mutationFn: updateMemoCharacterDescription });
  const { mutate: deleteMemoCharacterMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteMemoCharacter,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: memoQueryKeys.memoCharacterList(),
        });
      },
      onMutate: async (id: string) => {
        const previousMemoCharacterList = queryClient.getQueryData<
          TMemoCharacter[]
        >(memoQueryKeys.memoCharacterList());
        queryClient.setQueryData<TMemoCharacter[]>(
          memoQueryKeys.memoCharacterList(),
          (old) => old?.filter((memoCharacter) => memoCharacter.id !== id) || []
        );
        return { previousMemoCharacterList };
      },
    });
  const { mutate: updateMemoCharacterImageMutation } = useMutation({
    mutationFn: updateMemoCharacterImage,
  });
  const { mutate: updateMemoCharacterRoleMutation } = useMutation({
    mutationFn: updateMemoCharacterRole,
  });
  const { mutate: updateMemoCharacterBirthdayMutation } = useMutation({
    mutationFn: updateMemoCharacterBirthday,
  });
  const { mutate: updateMemoCharacterGenderMutation } = useMutation({
    mutationFn: updateMemoCharacterGender,
  });
  const { mutate: createMemoCharacterCharacteristicMutation } = useMutation({
    mutationFn: createMemoCharacterCharacteristic,
  });
  const { mutate: updateMemoCharacterCharacteristicTitleMutation } =
    useMutation({
      mutationFn: updateMemoCharacterCharacteristicTitle,
    });
  const { mutate: updateMemoCharacterCharacteristicContentMutation } =
    useMutation({
      mutationFn: updateMemoCharacterCharacteristicContent,
    });
  const { mutate: deleteMemoCharacterCharacteristicMutation } = useMutation({
    mutationFn: deleteMemoCharacterCharacteristic,
  });

  const debounceUpdateMemoCharacterName = useCallback(
    debounce(updateMemoCharacterNameMutation, 500),
    [data]
  );
  const debounceUpdateMemoCharacterDescription = useCallback(
    debounce(updateMemoCharacterDescriptionMutation, 500),
    [data]
  );

  const onClickDeleteMemoCharacter = (id: string) => () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    deleteMemoCharacterMutation(id);
  };
  const onChangeMemoCharacterName =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceUpdateMemoCharacterName({ id, ch_name: e.target.value });
      setMemoCharacterList((old) =>
        old.map((memoCharacter) =>
          memoCharacter.id === id
            ? { ...memoCharacter, ch_name: e.target.value }
            : memoCharacter
        )
      );
    };
  const onChangeMemoCharacterDescription =
    (id: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      debounceUpdateMemoCharacterDescription({
        id,
        description: e.target.value,
      });
      setMemoCharacterList((old) =>
        old.map((memoCharacter) =>
          memoCharacter.id === id
            ? { ...memoCharacter, description: e.target.value }
            : memoCharacter
        )
      );
    };
  async function getNewlyCreatedMemoCharacter() {
    const createdId = await createMemoCharacterMutateAsync();
    if (!createdId) return null;
    const newMemoCharacter: TMemoCharacter = {
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
    return newMemoCharacter;
  }
  useEffect(() => {
    if (data) {
      setMemoCharacterList(data);
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
    setMemoCharacterList,
    onClickDeleteMemoCharacter,
    onChangeMemoCharacterName,
    onChangeMemoCharacterDescription,
    getNewlyCreatedMemoCharacter,
  };
}
