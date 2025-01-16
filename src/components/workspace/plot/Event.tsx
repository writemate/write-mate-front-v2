import SelectCharacterModal from "./SelectCharacterModal";
import DragDrop from "@/assets/workspace/plot/dragdropE.svg";
import ChooseCharacter from "@/assets/workspace/plot/choosecharacter.svg";
import {
  CharacterImg,
  EventColumnContainer,
  EventDeleteBtn,
  EventDescription,
  EventDragWrap,
  EventHeader,
  EventTitle,
} from "@/styles/workspace/plot/Event.styles";
import { TPlotEvent } from "@/utils/APIs/types";
import useEvent from "@/hooks/workspace/plot/useEvent";
import { useWarningModal } from "@/hooks/common/useWarningModal";
import { WarningModal } from "@/components/dashboard/WarningModal";

export default function Event({
  id: eventId,
  event_name: eventName,
  event_description: eventDescription,
  character_list: characterList,
  chapterId,
}: TPlotEvent & { chapterId: string }) {
  const {
    selectCharacterModal,
    openSelectCharacterModal,
    editCharacterModal,
    selectModalRef,
    openEditCharacterModal,
    onEventDeleteClick,
    onEventNameChange,
    onEventDescriptionChange,
  } = useEvent(eventId, chapterId);

  const { isOpenDeleteModal, onOpenModal, closeModal } = useWarningModal();

  return (
    <>
      <EventDragWrap>
        <DragDrop />
      </EventDragWrap>
      <EventColumnContainer>
        <EventHeader>
          <ChooseCharacter onClick={openSelectCharacterModal} />
          {selectCharacterModal && (
            <SelectCharacterModal
              chapterId={chapterId}
              eventId={eventId}
              selectedCharacterList={characterList}
              modalRef={selectModalRef}
            />
          )}
          {characterList.map((character) => (
            <CharacterImg
              key={character.id}
              onClick={openEditCharacterModal(character.id)}
              $src={character.ch_image}
            />
          ))}
          <EventDeleteBtn
            onClick={onOpenModal}
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
          />
          {isOpenDeleteModal && (
            <WarningModal
              closeModal={closeModal}
              onClickConfirm={onEventDeleteClick}
              onClickCancel={closeModal}
              message={"이벤트를 삭제하시겠습니까?"}
              ConfirmButtonName={"삭제"}
            />
          )}
        </EventHeader>
        <EventTitle
          defaultValue={eventName}
          onChange={onEventNameChange}
          placeholder="사건 제목을 적어주세요."
        />
        <EventDescription
          defaultValue={eventDescription}
          onChange={onEventDescriptionChange}
          placeholder="사건 내용을 적어주세요."
        />
      </EventColumnContainer>
      {/* {editCharacterModal} */}
    </>
  );
}
