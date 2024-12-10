import CharacterModal from "./CharacterModal";
import DeleteIcon from "@/assets/workspace/plot/delete.svg";
import DragDrop from "@/assets/workspace/plot/dragdropE.svg";
import ChooseCharacter from "@/assets/workspace/plot/choosecharacter.svg";
import {
  CharacterImg,
  CharacterModalBtn,
  EventColumnContainer,
  EventContainer,
  EventDeleteBtn,
  EventDragWrap,
  EventTitle,
} from "@/styles/workspace/plot/Event.styles";
import UpdateModal from "./UpdateModal";
import { TPlotEvent } from "@/utils/APIs/types";
import { MemoContent } from "@/styles/workspace/plot/Chapter.styles";
import useEvent from "@/hooks/workspace/plot/useEvent";

export default function Event({
  id: eventId,
  event_name: eventName,
  event_description: eventDescription,
  character_list: characterList,
  chapterId,
}: TPlotEvent&{chapterId: string}) {

  const {
    selectCharacterModal,
    openSelectCharacterModal,
    closeSelectCharacterModal,
    editCharacterModal,
    openEditCharacterModal,
    closeEditCharacterModal,
    onEventDeleteClick,
    onEventNameChange,
    onEventDescriptionChange,
  } = useEvent(eventId, chapterId);

  return (
    <div style={{ position: "relative" }}>
      <EventDragWrap>
        <DragDrop />
      </EventDragWrap>
      <EventContainer>
        <EventColumnContainer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <CharacterModalBtn
                type="button"
                onClick={openSelectCharacterModal}
              >
                <ChooseCharacter />
              </CharacterModalBtn>
              {characterList.map((character) => (
                <CharacterImg
                  key={character.id}
                  onClick={openEditCharacterModal(character.id)}
                  $src={character.ch_image}
                />
              ))}
            </div>
            {editCharacterModal !== null && (
              <UpdateModal
                onClose={closeEditCharacterModal}
                characterId={editCharacterModal}
              />
            )}
            <EventDeleteBtn onClick={onEventDeleteClick}>
              <DeleteIcon />
            </EventDeleteBtn>
          </div>
          <EventTitle
            defaultValue={eventName}
            onChange={onEventNameChange}
            placeholder="사건 제목을 적어주세요."
          />
          <MemoContent
            value={eventDescription}
            onChange={onEventDescriptionChange}
            placeholder="사건 내용을 적어주세요."
          />
        </EventColumnContainer>
      </EventContainer>
      {selectCharacterModal && (
        <CharacterModal
          eventId={eventId}
          character={characterList}
          onClose={closeSelectCharacterModal}
        />
      )}
    </div>
  );
}
