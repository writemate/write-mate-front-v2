'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { TextArea } from "@/styles";

export default function ScriptSidebar() {
    return (
        <Container $marginTop={100}>
            <SubTitle>작품 소개</SubTitle>
            <TextArea placeholder={"줄거리 내용을 적어주세요.\n연재처 정보란에 들어갈 줄거리 내용을 적어도 좋아요."} rows={5}/>
        </Container>
    );
}
