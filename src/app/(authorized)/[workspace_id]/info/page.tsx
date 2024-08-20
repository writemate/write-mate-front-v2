'use client';
import { MainContainer } from '@/styles';

export default function Info({params: {workspace_id}}: {params: {workspace_id: string}}) {

  return (
      <MainContainer>
        <h1>정보</h1>
      </MainContainer>
  );
}
