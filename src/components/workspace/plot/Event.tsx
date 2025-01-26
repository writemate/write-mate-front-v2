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
import CharacterModal from "../character/CharacterModal";
import { IconButton } from "@/styles/workspace/plot/Chapter.styles";
import CopyIcon from "@/assets/workspace/plot/copy.svg";
import { useCallback, useRef } from "react";
import { copy } from "@/utils/copy";
import { CharacterImage } from "@/styles/workspace/Character.style";
import { getName } from "@/hooks/dashboard/character/characterItem";

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
    closeEditCharacterModal,
    editCharacterModal,
    selectModalRef,
    openEditCharacterModal,
    onEventDeleteClick,
    onEventNameChange,
    onEventDescriptionChange,
  } = useEvent(eventId, chapterId);

  const { isOpenDeleteModal, onOpenModal, closeModal } = useWarningModal();
  const descRef = useRef<HTMLTextAreaElement>(null);
  const handleCopy = useCallback(() => {
    if (descRef.current) {
      copy(descRef.current.value)();
    }
  }, []);

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
            <CharacterImage
              key={character.id}
              onClick={openEditCharacterModal(character.id)}
              $src={character.ch_image}
              $heightPx={32}
              $widthPx={32}
            >
              {!character.ch_image && character && (
                <p>{getName(character)[0]}</p>
              )}
            </CharacterImage>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "auto",
            }}
          >
            <IconButton type="button" onClick={handleCopy}>
              <CopyIcon />
            </IconButton>
            <IconButton onClick={onOpenModal}>
              <EventDeleteBtn />
            </IconButton>
            {isOpenDeleteModal && (
              <WarningModal
                closeModal={closeModal}
                onClickConfirm={onEventDeleteClick}
                onClickCancel={closeModal}
                message={"사건을 삭제하시겠습니까?"}
                ConfirmButtonName={"삭제"}
              />
            )}
          </div>
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
          ref={descRef}
        />
      </EventColumnContainer>
      {editCharacterModal && (
        <CharacterModal
          characterId={editCharacterModal}
          closeModal={closeEditCharacterModal}
        />
      )}
    </>
  );
}
