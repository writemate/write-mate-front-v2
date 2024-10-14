'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { CharacteristicContainer, CharacteristicTitle, CharacteristicContent, CharacteristicAdd, CharacteristicListContainer } from "@/styles/workspace/Character.style";
import { useContext } from 'react';
import TrashCan from "@/assets/icons/trashcan.svg";
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Description() {
  const { isLoading, onClickAddCharacteristic, characteristicList,
    onClickRemoveCharacteristic, onChangeCharacteristicTitle,
    onChangeCharacteristicContent } = useContext(CharacterContext);
  return (
    <Container>
      <SubTitle>특징</SubTitle>
      <CharacteristicListContainer>
        {characteristicList.map((c, i) => (
          <CharacteristicContainer key={i}>
            <CharacteristicTitle type="text" placeholder="특징을 적어주세요." value={c.title} onChange={onChangeCharacteristicTitle(i)} disabled={isLoading} />
            <TrashCan onClick={onClickRemoveCharacteristic(i)} />
            <CharacteristicContent placeholder="성격이나, 외향적 특징, 출생의 비밀 등 세부 내용을 적어주세요."
              value={c.content} onChange={onChangeCharacteristicContent(i)} disabled={isLoading}
              rows={2}
            />
          </CharacteristicContainer>
        ))}
        <CharacteristicAdd onClick={onClickAddCharacteristic} disabled={isLoading}>특징 추가하기</CharacteristicAdd>
      </CharacteristicListContainer>
    </Container>
  );
}
