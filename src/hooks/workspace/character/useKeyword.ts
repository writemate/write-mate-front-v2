import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { addCharacterKeyword, removeCharacterKeyword, getCharacterKeywordList, createCharacterKeyword, deleteCharacterKeyword } from "@/utils/APIs/workspace";
import { useParams, useRouter } from "next/navigation";
import { colorSystem } from "@/styles/colorSystem";
import { useState } from "react";

export function useKeyword() {
  const queryClient = useQueryClient();
  const { workspace_id, character_id } = useParams<{ workspace_id: string, character_id: string }>();

  const { data: keywordList, isLoading: isKeywordsLoading } = useQuery({
    queryKey: workspaceQueryKeys.characterKeywordList(workspace_id),
    queryFn: getCharacterKeywordList(workspace_id),
  });

  const { mutate: mutateAddKeyword, isPending: isPendingAddKeyword } = useMutation({
    mutationFn: addCharacterKeyword(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const { mutate: mutateRemoveKeyword, isPending: isPendingRemoveKeyword } = useMutation({
    mutationFn: removeCharacterKeyword(workspace_id, character_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const { mutate: mutateCreateKeyword, isPending: isPendingCreateKeyword } = useMutation({
    mutationFn: createCharacterKeyword(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const { mutate: mutateDeleteKeyword, isPending: isPendingDeleteKeyword } = useMutation({
    mutationFn: deleteCharacterKeyword(workspace_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: workspaceQueryKeys.characterDetail(workspace_id, character_id) }),
  });

  const onClickRemoveKeyword = (id: string) => () => mutateRemoveKeyword(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
  const [keywordInput, setKeywordInput] = useState("");
  const onChangeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => setKeywordInput(e.target.value);
  const colorList = [
    [colorSystem.red200,
    colorSystem.red500,],
    [colorSystem.orange200,
    colorSystem.orange500,],
    [colorSystem.blue200,
    colorSystem.blue500,],
    [colorSystem.green200,
    colorSystem.green500,],
    [colorSystem.purple200,
    colorSystem.purple500,],
    [colorSystem.darkYellow200,
    colorSystem.darkYellow600,]
  ]
  const [selectedColor, setSelectedColor] = useState<number|null>(null);
  const onClickColor = (index: number) => () => setSelectedColor(index);
  const onClickCreateKeyword = () => {
    if (keywordInput === "" || selectedColor === null) return;
    mutateCreateKeyword({ keyword_name: keywordInput, lightColor: colorList[selectedColor][0], darkColor: colorList[selectedColor][1] });
    setKeywordInput("");
    setSelectedColor(null);
    closeModal();
  };

  const onClickDeleteKeyword = (id: string) => () => mutateDeleteKeyword(id);

  return { keywordList, isKeywordsLoading, mutateAddKeyword,
    isPendingAddKeyword, isPendingRemoveKeyword,
    onClickRemoveKeyword, isModalOpen, openModal,
    closeModal, stopPropagation, keywordInput,
    onChangeKeywordInput, colorList, selectedColor,
    onClickColor, onClickCreateKeyword, onClickDeleteKeyword,};
}
