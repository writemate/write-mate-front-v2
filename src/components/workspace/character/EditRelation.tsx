import { TRelation, TWorkCharacter } from '@/utils/APIs/types';
import { useState } from 'react';

export default function EditRelation({
  workId,
  isNewMode,
  characters,
  setModalOpen,
  character1,
  character2,
  relation,
}: {
  workId: string;
  isNewMode?: boolean;
  characters?: TWorkCharacter[];
  setModalOpen?: any;
  character1?: TWorkCharacter;
  character2?: TWorkCharacter;
  relation?: TRelation;
}) {
  const [selectedCharacter1, setSelectedCharacter1] = useState<TWorkCharacter | undefined>(character1);
  const [selectedCharacter2, setSelectedCharacter2] = useState<TWorkCharacter | undefined>(character2);
  
  return (
    <div style={{ backgroundColor:"#FFF", width:"100%",height:"100%" }}>
    </div>
  );
};
