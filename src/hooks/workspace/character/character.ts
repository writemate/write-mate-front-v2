import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { getCharacter, updateCharacterName, updateCharacterRole, updateCharacterGender, 
  updateCharacterBirthday, addCharacterKeyword, removeCharacterKeyword,
  updateCharacterCoverImage, addCharacterCharacteristic, updateCharacterCharacteristicTitle,
  removeCharacterCharacteristic, updateCharacterCharacteristicContent,
  updateCharacterDescription, deleteCharacter
} from "@/utils/APIs/workspace";
import { debounce } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import { createContext } from "react";
import { TCharacter } from "@/utils/APIs/types";

function useUpdate<T,U>({updateFn, onMutate, onChange}:{
  updateFn: (workspace_id: string, chraacter_id:string) => (value: T) => Promise<void>,
  onMutate: (value: T) => void,
  onChange: (debouncedMutate: (value: T) => void) => U,
}) {
  const queryClient = useQueryClient();
  const { workspace_id, character_id } = useParams<{ workspace_id: string, character_id: string }>();
  const { mutate, isPending } = useMutation({
    mutationFn: updateFn(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
    onMutate,
  });
  const debouncedMutate = debounce(mutate, 500);
  return { onChange: onChange(debouncedMutate), isPending };
}

export function useCharacter() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { workspace_id, character_id } = useParams<{ workspace_id: string, character_id: string }>();
  const { data, error, isLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id),
    queryFn: getCharacter(workspace_id, character_id),
  });

  const { onChange: onChangeName, isPending: isPendingName } = useUpdate({
    updateFn: updateCharacterName,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        ch_name: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate(e.target.value),
  });

  const { mutate: deleteCharacterMutation, isPending: isPendingDeleteCharacter } = useMutation({
    mutationFn: deleteCharacter(workspace_id, character_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterList(workspace_id) });
      router.push(`/${workspace_id}/character`);
    },
  });

  const { onChange: onChangeRole, isPending: isPendingRole } = useUpdate({
    updateFn: updateCharacterRole,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        role: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeBirthday, isPending: isPendingBirthday } = useUpdate({
    updateFn: updateCharacterBirthday,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        birthday: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeGender, isPending: isPendingGender } = useUpdate({
    updateFn: updateCharacterGender,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        gender: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate(e.target.value),
  });

  const { onChange: onChangeDescription, isPending: isPendingDescription } = useUpdate({
    updateFn: updateCharacterDescription,
    onMutate: (value) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        description: value,
      }));
    },
    onChange: (debouncedMutate) => (e: React.ChangeEvent<HTMLTextAreaElement>) => debouncedMutate(e.target.value),
  });

  const { mutate: mutateAddKeyword, isPending: isPendingAddKeyword } = useMutation({
    mutationFn: addCharacterKeyword(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const { mutate: mutateRemoveKeyword, isPending: isPendingRemoveKeyword } = useMutation({
    mutationFn: removeCharacterKeyword(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const onClickRemoveKeyword = (id: string) => mutateRemoveKeyword(id);

  const { mutate: mutateAddCharacteristic, isPending: isPendingAddCharacteristic } = useMutation({
    mutationFn: addCharacterCharacteristic(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const onClickAddCharacteristic = () => mutateAddCharacteristic();

  const { mutate: mutateRemoveCharacteristic, isPending: isPendingRemoveCharacteristic } = useMutation({
    mutationFn: removeCharacterCharacteristic(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const onClickRemoveCharacteristic = (index: number) => () => mutateRemoveCharacteristic(index);

  const { onChange: onChangeCharacteristicTitle, isPending: isPendingCharacteristicTitle } = useUpdate({
    updateFn: updateCharacterCharacteristicTitle,
    onMutate: ({ index, title }) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        characteristic: prev.characteristic.map((c, i) => i === index ? { ...c, title } : c),
      }));
    },
    onChange: (debouncedMutate) =>(index:number)=>(e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate({index, title: e.target.value}),
  });

  const { onChange: onChangeCharacteristicContent, isPending: isPendingCharacteristicContent } = useUpdate({
    updateFn: updateCharacterCharacteristicContent,
    onMutate: ({ index, content }) => {
      queryClient.setQueryData(workspaceQueryKeys.characterDetail(workspace_id, character_id), (prev: TCharacter) => ({
        ...prev,
        characteristic: prev.characteristic.map((c, i) => i === index ? { ...c, content } : c),
      }));
    },
    onChange: (debouncedMutate) => (index:number)=>(e: React.ChangeEvent<HTMLInputElement>) => debouncedMutate({index, content: e.target.value}),
  });
  
  const { mutate: mutateCoverImage, isPending: isPendingCoverImage } = useMutation({
    mutationFn: updateCharacterCoverImage(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
    onMutate:(value) => {
      queryClient.setQueryData(workspaceQueryKeys.info(workspace_id), (prev: any) => ({
        ...prev,
        cover: URL.createObjectURL(value),
      }));
    },
  });
  const onChangeCoverImage =(e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      mutateCoverImage(file);
  };

  return { data, error, isLoading, isPendingName, isPendingRole, isPendingGender, isPendingBirthday, isPendingDescription,
    isPendingAddKeyword, isPendingRemoveKeyword, isPendingAddCharacteristic, isPendingRemoveCharacteristic,
    isPendingCharacteristicTitle, isPendingCharacteristicContent, isPendingCoverImage,
    onChangeName, onChangeRole, onChangeGender, onChangeBirthday, onChangeDescription,
    onClickRemoveKeyword, onClickAddCharacteristic, onClickRemoveCharacteristic,
    onChangeCharacteristicTitle, onChangeCharacteristicContent, onChangeCoverImage,
    deleteCharacter: deleteCharacterMutation,};
}

export const CharacterContext = createContext({} as ReturnType<typeof useCharacter>);
