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
        {isRelationOpen && <NetworkGraph relations={[
          {
              "_id": "664d7c5b2759bb8efed678e3",
              "arrow_right": true,
              "arrow_left": true,
              "arrow_text_right": "좋아함",
              "arrow_text_left": "싫어함",
              "start_ch": "664d7bf587efd707ce2c3815",
              "end_ch": "664d7c2f2759bb8efed678b4",
              "start_ch_image": "https://image-youth-novel.s3.ap-northeast-2.amazonaws.com/users/XWQBnN6bPyOjryfoInKNRnVltft1/2017042000056_0_1716354079554.jpg",
              "end_ch_image": "https://image-youth-novel.s3.ap-northeast-2.amazonaws.com/users/XWQBnN6bPyOjryfoInKNRnVltft1/2017042000056_0_1716354113965.jpg",
              "start_ch_name": "라이언",
              "end_ch_name": "라이언의 라이벌"
          }
      ]}/>}
      </>
  );
}
