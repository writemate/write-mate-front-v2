import { TRelation, TCharacter } from '@/utils/APIs/types';
import DropdownCharacter from '@/components/workspace/character/DropdownCharacter';
import { useEditRelation } from '@/hooks/workspace/character/useEditRelation';
import { EditRelationContainer, RelationTitle, RelationContentsContainer, RelationCharacterContainer, RelationCharacterImage,
  RelationCharacterName, RelationCharacterDescription, RelationArrowContainer, RelationFooter,CancelButton, SaveButton,
} from '@/styles/workspace/Character.style';
import { Button } from '@/styles';
import RelationToLeft from '@/assets/workspace/character/relationToLeft.svg';
import RelationToRight from '@/assets/workspace/character/relationToRight.svg';
import RelationStick from '@/assets/workspace/character/relationStick.svg';

export type EditRelationProps<T extends boolean> ={
  isNewMode: T,
  characterList?: T extends true ? TCharacter[] : undefined,
  character1?: T extends true ? undefined : TCharacter,
  character2?: T extends true ? undefined : TCharacter,
  relation?: T extends true ? undefined : TRelation,
  closeModal?: () => void,
}

export default function EditRelation<T extends boolean>({
  isNewMode,
  characterList,
  ...otherProps
}: EditRelationProps<T>) {
  const { selectedCharacter1, selectedCharacter2, selectCharacter1, selectCharacter2,
    inputRelationRight, inputRelationLeft, onRelationRightChange, onRelationLeftChange,
    onClickCreate, onClickUpdate, onClickDelete, closeModal } = useEditRelation(otherProps);
  

  const isSavalble = !!selectedCharacter1 && !!selectedCharacter2 && !!inputRelationLeft && !!inputRelationRight;

  return (
    <EditRelationContainer>
      <RelationTitle>관계 {isNewMode ? "생성" : "수정"}</RelationTitle>
      <hr/>
      <RelationContentsContainer>
        <RelationCharacterContainer>
          <RelationCharacterImage $src={selectedCharacter1?.ch_image??""}/>
          {!isNewMode && <RelationCharacterName>{selectedCharacter1?.ch_name}</RelationCharacterName>}
          {isNewMode && <DropdownCharacter placeholder="인물 선택" options={characterList!} selected={selectedCharacter1?.ch_name} setSelected={selectCharacter1}/>}
          <RelationCharacterDescription>{selectedCharacter1?.description}</RelationCharacterDescription>
        </RelationCharacterContainer>
        <RelationArrowContainer>
          <div>
            <RelationStick/>
            <input type="text" value={inputRelationLeft} onChange={onRelationLeftChange} placeholder="관계를 작성해 주세요."/>
            <RelationToRight/>
          </div>
          <div>
            <RelationToLeft/>
            <input type="text" value={inputRelationRight} onChange={onRelationRightChange} placeholder="관계를 작성해 주세요."/>
            <RelationStick/>
          </div>
        </RelationArrowContainer>
        <RelationCharacterContainer>
          <RelationCharacterImage $src={selectedCharacter2?.ch_image??""}/>
          {!isNewMode && <RelationCharacterName>{selectedCharacter2?.ch_name}</RelationCharacterName>}
          {isNewMode && <DropdownCharacter placeholder="인물 선택" options={characterList!} selected={selectedCharacter2?.ch_name} setSelected={selectCharacter2}/>}
          <RelationCharacterDescription>{selectedCharacter2?.description}</RelationCharacterDescription>
        </RelationCharacterContainer>
      </RelationContentsContainer>
      <hr/>
      <RelationFooter>
        {!isNewMode && <Button onClick={onClickDelete} $background='#F22828' $color="#fff">삭제</Button>}
        <CancelButton onClick={closeModal}>취소</CancelButton>
        {!isNewMode && <SaveButton onClick={onClickUpdate} $isSavalble={isSavalble}>수정</SaveButton>}
        {isNewMode && <SaveButton onClick={onClickCreate} $isSavalble={isSavalble}>생성</SaveButton>}
      </RelationFooter>
    </EditRelationContainer>
  );
};
