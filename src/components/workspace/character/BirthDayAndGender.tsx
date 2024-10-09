'use client';
import { Container, SubTitle, TextWithDropMenu} from "@/styles/workspace/Info.style";
import { } from "@/styles/workspace/Character.style";
import { Input } from "@/styles";
import { useContext } from 'react';
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Description() {
    const { data, isLoading, onChangeBirthday, onChangeGender} = useContext(CharacterContext);
    const { birthday, gender } = data ?? {};
    return (
        <TextWithDropMenu style={{maxWidth: "748px", alignSelf:"flex-start"}}>
            <Container>
                <SubTitle>출생일</SubTitle>
                <Input placeholder={"출생일을 입력해주세요."} onChange={onChangeBirthday} defaultValue={birthday} disabled={isLoading}/>
            </Container>
            <Container>
                <SubTitle>성별</SubTitle>
                <Input placeholder={"성별을 입력해주세요."} onChange={onChangeGender} defaultValue={gender} disabled={isLoading}/>
            </Container>
        </TextWithDropMenu>
    );
}
