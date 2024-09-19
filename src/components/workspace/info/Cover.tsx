'use client';
import { CoverContainer, CoverImage, Container, SubTitle, TextWithDropMenu, DropdownMenu } from "@/styles/workspace/Info.style";
import { Input, TextArea } from "@/styles";

export default function ScriptSidebar() {
    return (
        <CoverContainer>
            <CoverImage src="https://artmugfile2.cafe24.com/image/goods_img1/2/24621.jpg?ver=1657860911"/>
            <Container $marginTop={0}>
                <SubTitle>제목</SubTitle>
                <TextWithDropMenu>
                    <Input type="text" placeholder="작품의 제목을 적어주세요." />
                    <DropdownMenu>장르 선택</DropdownMenu>
                </TextWithDropMenu>
                <SubTitle style={{marginTop:46}}>로그라인</SubTitle>
                <TextArea placeholder="내 작품을 한 줄로 요약한 내용을 적어주세요." />
            </Container>
        </CoverContainer>
    );
}
