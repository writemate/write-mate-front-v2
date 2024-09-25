'use client';
import { Title } from '@/styles/workspace';
import { Infos } from "@/styles/workspace/Info.style";
import Cover from '@/components/workspace/info/Cover';
import Introduction from '@/components/workspace/info/Introduction';
import ExpectedQuantity from '@/components/workspace/info/ExpectedQuantity';
import MainCharacter from '@/components/workspace/info/MainCharacter';
import Keyword from '@/components/workspace/info/Keyword';
import MainPlot from '@/components/workspace/info/MainPlot';

export default function Info({params: {workspace_id}}: {params: {workspace_id: string}}) {

  return (
      <>
        <Title>작품 정보</Title>
        <Cover/>
        <Infos>
          <Introduction/>
          <ExpectedQuantity/>
          <MainCharacter/>
          <Keyword/>
          <MainPlot/>
        </Infos>
      </>
  );
}
