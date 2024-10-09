'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { TextArea } from "@/styles";
import { useContext } from 'react';
import { InfoContext } from "@/hooks/workspace/info";

export default function Description() {
    const { data, isLoading, onChangeIntroduction} = useContext(InfoContext);
    const { introduction } = data ?? {};
    return (
        <Container>
            <SubTitle>키워드</SubTitle>
        </Container>
    );
}
