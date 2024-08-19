'use client';
import { MainContainer } from '@/styles';

export default function Plot({params: {workspace_id}}: {params: {workspace_id: string}}) {
  console.log(workspace_id);

  return (
      <MainContainer>
        <h1>플롯</h1>
      </MainContainer>
  );
}
