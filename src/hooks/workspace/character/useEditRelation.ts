import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { createCharacterRelation, deleteCharacterRelation, updateCharacterRelation} from "@/utils/APIs/workspace";
import { TRelation, TCharacter } from "@/utils/APIs/types";
import { useState } from "react";
import { EditRelationProps } from "@/components/workspace/character/EditRelation";
import { useParams } from "next/navigation";

export function useEditRelation({character1, character2, relation, closeModal }: Omit<EditRelationProps<boolean>, 'isNewMode'|'characterList'>) {
  const { workspace_id } = useParams<{workspace_id: string}>();
  const [selectedCharacter1, setSelectedCharacter1] = useState<TCharacter | undefined>(character1);
  const [selectedCharacter2, setSelectedCharacter2] = useState<TCharacter | undefined>(character2);

  const selectCharacter = (selectFn: typeof setSelectedCharacter1 | typeof setSelectedCharacter2) => (character: TCharacter) => {
    selectFn(character);
  }
  const selectCharacter1 = selectCharacter(setSelectedCharacter1);
  const selectCharacter2 = selectCharacter(setSelectedCharacter2);

  const [inputRelationRight, setInputRelationRight] = useState<string>(relation?.arrow_text_right ?? '');
  const [inputRelationLeft, setInputRelationLeft] = useState<string>(relation?.arrow_text_left ?? '');

  const onRelationRightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRelationRight(e.target.value);
  }

  const onRelationLeftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRelationLeft(e.target.value);
  }

  const queryClient = useQueryClient();

  const { mutate: createRelation } = useMutation({
    mutationFn: createCharacterRelation(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: workspaceQueryKeys.characterRelation(workspace_id)});
    },
  });

  const { mutate: updateRelation } = useMutation({
    mutationFn: updateCharacterRelation(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: workspaceQueryKeys.characterRelation(workspace_id)});
    },
  });

  const { mutate: deleteRelation } = useMutation({
    mutationFn: deleteCharacterRelation(workspace_id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: workspaceQueryKeys.characterRelation(workspace_id)});
    },
  });

  const onClickCreate = () => {
    createRelation({
      start_ch: selectedCharacter1!._id,
      end_ch: selectedCharacter2!._id,
      arrow_text_left: inputRelationLeft,
      arrow_text_right: inputRelationRight,
    });
    closeModal?.();
  }

  const onClickUpdate = () => {
    updateRelation({
      relation_id: relation!._id,
      arrow_text_left: inputRelationLeft,
      arrow_text_right: inputRelationRight,
    });
    closeModal?.();
  }

  const onClickDelete = () => {
    deleteRelation(relation!._id);
    closeModal?.();
  }

  return {
    selectedCharacter1,
    selectedCharacter2,
    selectCharacter1,
    selectCharacter2,
    inputRelationRight,
    inputRelationLeft,
    onRelationRightChange,
    onRelationLeftChange,
    onClickCreate,
    onClickUpdate,
    onClickDelete,
    closeModal,
  }
}
