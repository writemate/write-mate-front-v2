'use client';
import { IdeaBoxContainer, IdeaBoxHeader, IdeaBoxTitle, IdeaBoxCloseButton,
  SelectIdeaTypeContainer, SelectIdeaTypeButton, IdeaBoxContent } from "@/styles/workspace/IdeaBox.styles";
import { useIdeaBox } from '@/hooks/workspace/useIdeaBox';

export default function IdeaBox({toggleIdeaBox}: {toggleIdeaBox: () => void}) {
  const { selectMemo, selectCharacter, selectEvent, isMemoSelected, isCharacterSelected, isEventSelected } = useIdeaBox();

  return (
      <IdeaBoxContainer>
        <IdeaBoxHeader>
          <IdeaBoxTitle>아이디어 보관함</IdeaBoxTitle>
          <IdeaBoxCloseButton onClick={toggleIdeaBox}/>
        </IdeaBoxHeader>
        <SelectIdeaTypeContainer>
          <SelectIdeaTypeButton $isSelected={isMemoSelected} onClick={selectMemo}>메모</SelectIdeaTypeButton>
          <SelectIdeaTypeButton $isSelected={isCharacterSelected} onClick={selectCharacter}>캐릭터</SelectIdeaTypeButton>
          <SelectIdeaTypeButton $isSelected={isEventSelected} onClick={selectEvent}>이벤트</SelectIdeaTypeButton>
        </SelectIdeaTypeContainer>
        <IdeaBoxContent>
          {isMemoSelected && <div>메모</div>}
          {isCharacterSelected && <div>캐릭터</div>}
          {isEventSelected && <div>이벤트</div>}
        </IdeaBoxContent>
      </IdeaBoxContainer>
  );
}
