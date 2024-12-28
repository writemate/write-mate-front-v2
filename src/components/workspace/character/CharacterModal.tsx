'use client';
import { Infos } from "@/styles/workspace/Info.style";
import Cover from '@/components/workspace/character/Cover';
import Description from '@/components/workspace/character/Description';
import BirthDayAndGender from '@/components/workspace/character/BirthDayAndGender';
import Characteristics from '@/components/workspace/character/Characteristics';
import Keywords from '@/components/workspace/character/Keywords';
import RelatedEvents from '@/components/workspace/character/RelatedEvents';
import { useCharacter, CharacterContext } from '@/hooks/workspace/character/character';
import { CloseButton, DeleteButton } from "@/styles";
import { SubTitle } from "@/styles/workspace/Info.style";
import Modal from "@/components/Modal";

export default function CharacterModal({characterId, closeModal} : {characterId: string, closeModal: ()=>void}) {
  const value = useCharacter(characterId);

  return (
    <Modal closeModal={closeModal} maxWidth={820}>
      <div style={{width: '100%', height: '100%', background:"#fff", borderRadius:"8px", padding:"36px", overflowY:"auto", display:"flex", flexDirection:"column"}}>
        <CharacterContext.Provider value={value}>
          <div style={{display:"flex",alignItems:"flex-start",gap:20}}>
            <SubTitle>인물 정보</SubTitle>
            <CloseButton onClick={() => history.back()} style={{marginLeft:"auto"}}>닫기</CloseButton>
          </div>
          <Cover isDeletable={false}/>
          <Infos>
            <Description/>
            <BirthDayAndGender/>
            <Characteristics/>
            <Keywords/>
            <RelatedEvents/>
          </Infos>
          <DeleteButton onClick={value.onClickDeleteCharacter} style={{marginLeft:"auto",marginBottom:"auto"}}>삭제하기</DeleteButton>
        </CharacterContext.Provider>
      </div>
    </Modal>
  );
}
