import { TRelation, TCharacter } from '@/utils/APIs/types';
import DropdownCharacter from '@/components/workspace/character/DropdownCharacter';
import { useEditRelation } from '@/hooks/workspace/character/useEditRelation';

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
  

  return (
    <div style={{ backgroundColor:"#FFF", width:"100%",height:"100%" }}>
      <div>관계수정</div>
      <hr/>
      <div>
        <img src={selectedCharacter1?.ch_image} width="100px" height="100px"/>
        {!isNewMode && <div>{selectedCharacter1?.ch_name}</div>}
        {isNewMode && <DropdownCharacter placeholder="인물 선택" options={characterList!} selected={selectedCharacter1?.ch_name} setSelected={selectCharacter1}/>}
        <div>{selectedCharacter1?.description}</div>
      </div>
      <div>
        <input type="text" value={inputRelationLeft} onChange={onRelationLeftChange} placeholder="관계를 작성해 주세요."/>
        <input type="text" value={inputRelationRight} onChange={onRelationRightChange} placeholder="관계를 작성해 주세요."/>
      </div>
      <div>
        <img src={selectedCharacter2?.ch_image} width="100px" height="100px"/>
        {!isNewMode && <div>{selectedCharacter2?.ch_name}</div>}
        {isNewMode && <DropdownCharacter placeholder="인물 선택" options={characterList!} selected={selectedCharacter2?.ch_name} setSelected={selectCharacter2}/>}
        <div>{selectedCharacter2?.description}</div>
      </div>
      <hr/>
      {!isNewMode && <div onClick={onClickDelete}>삭제</div>}
      <div onClick={closeModal}>취소</div>
      {!isNewMode && <div onClick={onClickUpdate}>수정</div>}
      {isNewMode && <div onClick={onClickCreate}>생성</div>}
    </div>
  );
};
