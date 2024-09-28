'use client';
import { useContext } from 'react';
import { CoverContainer, Container, SubTitle, TextWithDropMenu, DropdownMenu } from "@/styles/workspace/Info.style";
import CoverImageBox from '@/components/workspace/info/CoverImageBox';
import { Input, TextArea } from "@/styles";
import { InfoContext } from "@/hooks/workspace/info";

export default function Cover() {
    const { data, isLoading, onChangeTitle, onChangeGenre, onChangeLogline} = useContext(InfoContext);
    const { title, genre, logline } = data??{};
    return (
        <CoverContainer>
            <CoverImageBox/>
            <Container>
                <SubTitle>제목</SubTitle>
                <TextWithDropMenu>
                    <Input type="text" placeholder="작품의 제목을 적어주세요." onChange={onChangeTitle} defaultValue={title} disabled={isLoading}/>
                    <DropdownMenu>장르 선택</DropdownMenu>
                </TextWithDropMenu>
                <SubTitle style={{marginTop:46}}>로그라인</SubTitle>
                <TextArea placeholder="내 작품을 한 줄로 요약한 내용을 적어주세요." onChange={onChangeLogline} defaultValue={logline} disabled={isLoading}/>
            </Container>
        </CoverContainer>
    );
}
