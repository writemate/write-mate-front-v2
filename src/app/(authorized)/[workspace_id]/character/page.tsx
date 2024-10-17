'use client';
import { useTab } from '@/hooks/workspace/character/useTab';
import { Title } from '@/styles/workspace';
import { TabContainer, TabButton } from '@/styles/workspace/Character.style';
import CharacterList from '@/components/workspace/character/CharacterList';
import NetworkGraph from '@/components/workspace/character/NetworkGraph';

export default function CharacterPage() {
  const { selectCharacter, selectRelation, isCharacterOpen, isRelationOpen } = useTab();

  return (
      <>
        <Title>작품 속 인물</Title>
        <TabContainer>
          <TabButton onClick={selectCharacter} $isSelected={isCharacterOpen}>인물</TabButton>
          <TabButton onClick={selectRelation} $isSelected={isRelationOpen}>인물관계도</TabButton>
        </TabContainer>
        {isCharacterOpen && <CharacterList />}
        {isRelationOpen && <NetworkGraph/>}
      </>
  );
}
