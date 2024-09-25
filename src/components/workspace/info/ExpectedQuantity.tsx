'use client';
import { Container, SubTitle, TextWithDropMenu, DropdownMenu } from "@/styles/workspace/Info.style";
import { Input } from "@/styles";

export default function ScriptSidebar() {
    return (
        <Container>
            <SubTitle>예상 분량</SubTitle>
            <TextWithDropMenu style={{maxWidth:392}}>
                <Input type="number" placeholder="예상 분량을 적어주세요" />
                <DropdownMenu>장르 선택</DropdownMenu>
            </TextWithDropMenu>
        </Container>
    );
}
