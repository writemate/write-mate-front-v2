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
            <SubTitle>연관 사건</SubTitle>
        </Container>
    );
}
