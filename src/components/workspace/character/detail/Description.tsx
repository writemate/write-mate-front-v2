'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { TextArea } from "@/styles";
import { useContext } from 'react';
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Description() {
    const { data, isLoading, onChangeDescription} = useContext(CharacterContext);
    const { description } = data ?? {};
    return (
        <Container>
            <SubTitle>인물 소개</SubTitle>
            <TextArea placeholder={"줄거리 내용을 적어주세요.\n연재처 정보란에 들어갈 줄거리 내용을 적어도 좋아요."} rows={5}
                onChange={onChangeDescription} defaultValue={description} disabled={isLoading}/>
        </Container>
    );
}
