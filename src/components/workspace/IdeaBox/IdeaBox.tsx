'use client';
import { IdeaBoxContainer, IdeaBoxHeader, IdeaBoxTitle, IdeaBoxCloseButton,
  SelectIdeaTypeContainer, SelectIdeaTypeButton, IdeaBoxContent } from "@/styles/workspace/IdeaBox.styles";
import { useIdeaBox } from '@/hooks/workspace/useIdeaBox';
import Memo from './Memo';

export default function IdeaBox({toggleIdeaBox}: {toggleIdeaBox: () => void}) {
  const { selectMemo, selectCharacter, isMemoSelected, isCharacterSelected } = useIdeaBox();

  return (
      <IdeaBoxContainer>
        <IdeaBoxHeader>
          <IdeaBoxTitle>아이디어 보관함</IdeaBoxTitle>
          <IdeaBoxCloseButton onClick={toggleIdeaBox}/>
        </IdeaBoxHeader>
        <SelectIdeaTypeContainer>
          <SelectIdeaTypeButton $isSelected={isMemoSelected} onClick={selectMemo}>메모</SelectIdeaTypeButton>
          <SelectIdeaTypeButton $isSelected={isCharacterSelected} onClick={selectCharacter}>캐릭터</SelectIdeaTypeButton>
        </SelectIdeaTypeContainer>
        <IdeaBoxContent>
          {isMemoSelected && <Memo/>}
          {isCharacterSelected && <div>캐릭터</div>}
        </IdeaBoxContent>
      </IdeaBoxContainer>
  );
}
