import { addCharacter, deleteCharacter } from "@/utils/APIs/plot";
import { workspaceQueryKeys } from "@/utils/APIs/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToastMessage from "./showToastMessage";
import { TPlot, TSimpleCharacter } from "@/utils/APIs/types";
import { useCharacterList } from "../character/useCharacterList";
import { mockCharacterList } from "@/utils/APIs/mock/plot";
import { useOnClickUpdate } from "@/hooks/common/useOnClickUpdate";
import { useParams } from "next/navigation";

const useSelectCharacterModal = (chapterId:string, eventId: string, selectedCharacterList: TSimpleCharacter[]) => {
  const { workspace_id, plot_id } = useParams<{ workspace_id: string; plot_id: string }>();
  const queryClient = useQueryClient();
  const { characterList } = useCharacterList();

  const onSelectCharacterClick = useOnClickUpdate({
    mutationFn: addCharacter(chapterId, eventId),
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    savingMessage: "캐릭터를 선택",
    errorMessage: "캐릭터 선택에 실패했습니다.",
    onMutate: (characterId) => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id))!;
      const previousChapters = previousPlot?.chapter_list!;
      const previousEvents = previousChapters?.find((chapter) => chapter.id === chapterId)?.pevent_list!;
      const previousChracaters = previousEvents?.find((event) => event.id === eventId)?.character_list!;
      if(!previousChracaters) return;

      const newCharacters = [...previousChracaters, characterList!.find((character) => character.id === characterId)!];
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: previousChapters.map((chapter) => {
        if(chapter.id === chapterId) {
          return {...chapter, pevent_list: previousEvents?.map((event) => {
            if(event.id === eventId) {
              return {...event, character_list: newCharacters};
            }
            return event;
          })};
        }
        return chapter;
      })});
      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  });

  const onUnselectCharacterClick = useOnClickUpdate({
    mutationFn: deleteCharacter(chapterId, eventId),
    queryKey: workspaceQueryKeys.characterList(workspace_id),
    savingMessage: "캐릭터를 선택 해제",
    errorMessage: "캐릭터 선택 해제에 실패했습니다.",
    onMutate: (characterId) => {
      const previousPlot = queryClient.getQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id))!;
      const previousChapters = previousPlot?.chapter_list!;
      const previousEvents = previousChapters?.find((chapter) => chapter.id === chapterId)?.pevent_list!;
      const previousChracaters = previousEvents?.find((event) => event.id === eventId)?.character_list!;
      if(!previousChracaters) return;

      const newCharacters = previousChracaters.filter((character) => character.id !== characterId);
      queryClient.setQueryData<TPlot>(workspaceQueryKeys.plot(workspace_id, plot_id), {...previousPlot, chapter_list: previousChapters.map((chapter) => {
        if(chapter.id === chapterId) {
          return {...chapter, pevent_list: previousEvents?.map((event) => {
            if(event.id === eventId) {
              return {...event, character_list: newCharacters};
            }
            return event;
          })};
        }
        return chapter;
      })});
      return { previousPlot };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(workspaceQueryKeys.plot(workspace_id, plot_id), context?.previousPlot);
    }
  });

  const remainingCharacters = (characterList??[]).filter(
    (character) =>
      !selectedCharacterList.some((selected) => selected.id === character.id)
  );

  return {
    onSelectCharacterClick,
    onUnselectCharacterClick,
    remainingCharacters,
  };

};

export default useSelectCharacterModal;
