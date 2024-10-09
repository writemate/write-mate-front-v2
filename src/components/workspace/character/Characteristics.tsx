'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { TextArea } from "@/styles";
import { useContext } from 'react';
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Description() {
    const { data, isLoading, onClickAddCharacteristic,
        onClickRemoveCharacteristic, onChangeCharacteristicTitle,
        onChangeCharacteristicContent} = useContext(CharacterContext);
    const { characteristic } = data ?? {};
    return (
        <Container>
            <SubTitle>특징</SubTitle>
            {characteristic?.map((c, i) => (
                <div key={i}>
                    <input type="text" placeholder="제목" defaultValue={c.title} onChange={onChangeCharacteristicTitle(i)} disabled={isLoading}/>
                    <input type="text" placeholder="내용" defaultValue={c.content} onChange={onChangeCharacteristicContent(i)} disabled={isLoading}/>
                    <button onClick={onClickRemoveCharacteristic(i)} disabled={isLoading}>삭제</button>
                </div>
            ))}
            <button onClick={onClickAddCharacteristic} disabled={isLoading}>추가</button>
        </Container>
    );
}
