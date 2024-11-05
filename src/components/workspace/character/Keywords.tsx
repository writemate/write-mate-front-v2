'use client';
import { Container, SubTitle } from "@/styles/workspace/Info.style";
import { KeywordListContainer, KeywordContainer, MiniModal } from "@/styles/workspace/Character.style";
import { useContext } from 'react';
import AddButton from "@/assets/icons/addButton.svg";
import KeywordCancel from "@/assets/workspace/character/keywordCancel.svg";
import { CharacterContext } from "@/hooks/workspace/character/character";

export default function Description() {
    const { data, isLoading, onClickRemoveKeyword } = useContext(CharacterContext);
    const { keyword } = data ?? {};
    return (
        <Container>
            <SubTitle>키워드</SubTitle>
            <KeywordListContainer>
                {keyword && keyword.map((keyword, index) => (
                <KeywordContainer key={index}
                    // $lightColor={keyword.lightColor}
                    // $darkColor={keyword.darkColor}
                >
                    <span>{keyword}</span>
                    <KeywordCancel onClick={onClickRemoveKeyword(keyword)} />
                </KeywordContainer>
                ))}
                <AddButton />
            </KeywordListContainer>
        </Container>
    );
}
